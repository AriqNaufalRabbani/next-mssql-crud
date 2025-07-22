import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'

export async function GET() {
  const pool = await getConnection()
  const result = await pool.request().query('SELECT * FROM Items')
  return NextResponse.json(result.recordset)
}

export async function POST(req) {
  const { name, quantity } = await req.json()
  const pool = await getConnection()
  await pool
    .request()
    .input('name', name)
    .input('quantity', quantity)
    .query('INSERT INTO Items (name, quantity) VALUES (@name, @quantity)')
  return NextResponse.json({ message: 'Created' })
}

export async function PUT(req) {
  const { id, name, quantity } = await req.json()
  const pool = await getConnection()
  await pool
    .request()
    .input('id', id)
    .input('name', name)
    .input('quantity', quantity)
    .query('UPDATE Items SET name = @name, quantity = @quantity WHERE id = @id')
  return NextResponse.json({ message: 'Updated' })
}

export async function DELETE(req) {
  const { id } = await req.json()
  const pool = await getConnection()
  await pool.request().input('id', id).query('DELETE FROM Items WHERE id = @id')
  return NextResponse.json({ message: 'Deleted' })
}
