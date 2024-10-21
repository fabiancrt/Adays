
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }


  res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');

  res.status(200).json({ message: 'User logged out successfully' });
}