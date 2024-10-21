import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await prisma.user.updateMany({
        data: {
          tasksCompletedThisMonth: 0,
        },
      });

      res.status(200).json({ message: 'Tasks completed this month reset successfully' });
    } catch (error) {
      console.error('Error resetting tasks completed this month:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}