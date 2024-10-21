import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { username } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { objective: true },
    });

    if (!user) {
      console.log('User not found:', username);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Fetched objective for user:', username, user.objective);
    res.status(200).json({ objective: user.objective });
  } catch (error) {
    console.error('Failed to fetch user objective:', error);
    res.status(500).json({ error: 'Failed to fetch user objective' });
  }
}