import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'recipes.json')

export default function handler(req, res) {
  let recipes = JSON.parse(fs.readFileSync(filePath))
  const { method } = req

  if (method === 'GET') {
    return res.status(200).json(recipes)
  }

  if (method === 'POST') {
    const newRecipe = { ...req.body, id: Date.now() }
    recipes.push(newRecipe)
    fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2))
    return res.status(201).json(newRecipe)
  }

  if (method === 'DELETE') {
    const { id } = req.body
    recipes = recipes.filter(r => r.id !== id)
    fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2))
    return res.status(200).json({ message: 'Deleted' })
  }

  res.status(405).end()
}
