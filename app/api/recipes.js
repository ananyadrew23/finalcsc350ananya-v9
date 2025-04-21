import { db } from '@/lib/db'

export default async function handler(req, res) {
  const method = req.method

  if (method === 'GET') {
    const [rows] = await db.execute('SELECT * FROM recipes')
    return res.status(200).json(rows)
  }

  if (method === 'POST') {
    const { title, ingredients, steps, image_url } = req.body
    await db.execute(
      'INSERT INTO recipes (title, ingredients, steps, image_url) VALUES (?, ?, ?, ?)',
      [title, ingredients, steps, image_url]
    )
    return res.status(201).json({ message: 'Created' })
  }

  if (method === 'PUT') {
    const { id, title, ingredients, steps, image_url } = req.body
    await db.execute(
      'UPDATE recipes SET title=?, ingredients=?, steps=?, image_url=? WHERE id=?',
      [title, ingredients, steps, image_url, id]
    )
    return res.status(200).json({ message: 'Updated' })
  }

  if (method === 'DELETE') {
    const { id } = req.body
    await db.execute('DELETE FROM recipes WHERE id=?', [id])
    return res.status(200).json({ message: 'Deleted' })
  }

  return res.status(405).end()
}
