import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

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

    if (req.method === 'POST') {
      await prisma.user.update({
        where: { username },
        data: {
          totalTasksCompleted: { increment: 1 },
          tasksCompletedThisMonth: { increment: 1 },
        },
      });
      return res.status(200).json({ message: 'Tasks completed incremented successfully' });
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error incrementing tasks completed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}