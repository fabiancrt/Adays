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

    const user = await prisma.user.update({
      where: { username: username },
      data: { member: true },
    });

    res.status(200).json({ member: user.member });
  } catch (error) {
    console.error('Error updating membership status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}