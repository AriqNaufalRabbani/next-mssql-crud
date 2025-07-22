import { getConnection } from '@/lib/db';

export async function GET() {
  const db = await getConnection();
  const result = await db.query`SELECT * FROM Users ORDER BY id ASC`;
  return Response.json(result.recordset);
}

export async function POST(request) {
  const { username, password, email } = await request.json();
  const db = await getConnection();
  await db.query`INSERT INTO Users (username, password, email) VALUES (${username}, ${password}, ${email})`;
  return Response.json({ message: 'User added' });
}
