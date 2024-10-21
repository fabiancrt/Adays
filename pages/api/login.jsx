import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password, objective } = req.body;

  try {

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Invalid password for user:', username);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (user.objective !== objective) {
      console.log('Invalid objective for user:', username);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800`);

    console.log('User logged in successfully:', user.username);
    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error('User login failed:', error);
    res.status(500).json({ error: 'User login failed' });
  }
}