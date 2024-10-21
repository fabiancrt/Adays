import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, email, password, objective } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      console.log('Email already in use:', email);
      return res.status(400).json({ error: 'Email already in use' });
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUsername) {
      console.log('Username already in use:', username);
      return res.status(400).json({ error: 'Username already in use' });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        objective,
      },
    });

    console.log('User created successfully:', user.username);
    res.status(201).json({ username: user.username });
  } catch (error) {
    console.error('User creation failed:', error);
    res.status(500).json({ error: 'User creation failed' });
  }
}