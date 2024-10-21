import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, points } = req.body;

    try {
      const user = await prisma.user.update({
        where: { username },
        data: { aPoints: points },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating points:', error);
      res.status(500).json({ error: 'Failed to update points' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}