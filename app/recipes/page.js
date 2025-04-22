'use client'
import { useEffect, useState } from 'react'

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
  }, [])

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">🍽️ Recipes</h1>
      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">ไม่มีข้อมูลเมนูอาหาร</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{recipe.title}</h2>
              <p className="text-gray-700"><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p className="text-gray-700 mt-1"><strong>Steps:</strong> {recipe.steps}</p>
              {recipe.image_url && (
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="mt-4 w-full h-48 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
