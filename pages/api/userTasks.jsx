import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { getRandomTasks } from '../../utils/taskUtils'; 

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const getStartOfDay = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

export default async function handler(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded?.username;

    if (!username) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          totalTasksCompleted: true,
          tasksCompletedThisMonth: true,
          aPoints: true,
          lastReset: true,
          objective: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const tasks = await prisma.task.findMany({
        where: { username },
      });

      const lastReset = user.lastReset || new Date(0);
      const startOfDay = getStartOfDay();

      if (lastReset < startOfDay) {
        await prisma.task.deleteMany({ where: { username } });
        const newTasks = getRandomTasks(user.objective);
        await prisma.task.createMany({ data: newTasks.map(task => ({ ...task, username })) });
        await prisma.user.update({
          where: { username },
          data: { lastReset: new Date() },
        });
        return res.status(200).json({ ...user, tasks: newTasks });
      }

      return res.status(200).json({ ...user, tasks });
    }

    if (req.method === 'POST') {
      const { tasks } = req.body;
      if (!Array.isArray(tasks)) {
        return res.status(400).json({ error: 'Invalid tasks format' });
      }

      const formattedTasks = tasks.map((task) => ({
        task: task.task,
        progress: task.progress,
        status: task.status,
        username,
      }));

      await prisma.$transaction([
        prisma.task.deleteMany({ where: { username } }),
        prisma.task.createMany({
          data: formattedTasks,
        }),
      ]);

      return res.status(200).json({ message: 'Tasks updated successfully' });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error handling tasks:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}