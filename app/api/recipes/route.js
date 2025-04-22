import { NextResponse } from 'next/server'
import { getDB } from '../../../lib/db'

export async function GET() {
  const db = await getDB()
  const [rows] = await db.execute('SELECT * FROM recipes')
  return NextResponse.json(rows)
}

export async function POST(req) {
  const db = await getDB()
  const body = await req.json()
  const { title, ingredients, steps, image_url } = body

  await db.execute(
    'INSERT INTO recipes (title, ingredients, steps, image_url) VALUES (?, ?, ?, ?)',
    [title, ingredients, steps, image_url]
  )
  return NextResponse.json({ message: 'Created' }, { status: 201 })
}
