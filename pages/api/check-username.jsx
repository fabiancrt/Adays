import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const { username } = req.query;
    console.log('Received request to check username:', username);

    if (!username) {
      console.log('No username provided');
      return res.status(400).json({ error: 'Username is required' });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    console.log('User found:', user);

    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}