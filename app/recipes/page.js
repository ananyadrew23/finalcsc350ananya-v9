'use client'

import { useEffect, useState } from 'react'

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState({ title: '', ingredients: '', steps: '', image_url: '' })
  const [editingId, setEditingId] = useState(null)

  // ดึงข้อมูลเมนูจาก backend
  const fetchRecipes = async () => {
    try {
      const res = await fetch('/api/recipes')

      if (!res.ok) {
        console.error('❌ Fetch error:', res.status)
        return
      }

      const data = await res.json()
      setRecipes(data)
    } catch (err) {
      console.error('❌ Failed to fetch recipes:', err)
    }
  }

  // เมื่อกดเพิ่ม/แก้ไขเมนู
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...form, id: editingId } : form

      const res = await fetch('/api/recipes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        console.error('❌ Submit error:', res.status)
        return
      }

      setForm({ title: '', ingredients: '', steps: '', image_url: '' })
      setEditingId(null)
      fetchRecipes()
    } catch (err) {
      console.error('❌ Failed to submit recipe:', err)
    }
  }

  // กดแก้ไขเมนู
  const handleEdit = (recipe) => {
    setForm({
      title: recipe.title,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      image_url: recipe.image_url,
    })
    setEditingId(recipe.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // กดลบเมนู
  const handleDelete = async (id) => {
    if (!confirm('ยืนยันลบเมนูนี้?')) return

    try {
      const res = await fetch('/api/recipes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) {
        console.error('❌ Delete error:', res.status)
        return
      }

      fetchRecipes()
    } catch (err) {
      console.error('❌ Failed to delete recipe:', err)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <main className="main">
      <h1 className="heading">🍽️ จัดการเมนูอาหาร</h1>

      <form onSubmit={handleSubmit} className="form">
        <h3 className="formTitle">{editingId ? '✏️ แก้ไขเมนู' : '➕ เพิ่มเมนูใหม่'}</h3>
        <div className="formGrid">
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="ชื่อเมนู"
            required
          />
          <input
            value={form.ingredients}
            onChange={e => setForm({ ...form, ingredients: e.target.value })}
            placeholder="ส่วนผสม"
            required
          />
          <input
            value={form.steps}
            onChange={e => setForm({ ...form, steps: e.target.value })}
            placeholder="วิธีทำ"
            required
          />
          <input
            value={form.image_url}
            onChange={e => setForm({ ...form, image_url: e.target.value })}
            placeholder="ลิงก์รูป (ใส่หรือไม่ใส่ก็ได้)"
          />
        </div>
        <button type="submit" className="submitButton">
          {editingId ? 'บันทึก' : 'เพิ่มเมนู'}
        </button>
      </form>

      <div className="recipesGrid">
        {recipes.map(r => (
          <div key={r.id} className="recipeCard">
            {r.image_url && (
              <img src={r.image_url} alt={r.title} className="recipeImage" />
            )}
            <div className="recipeContent">
              <h2 className="recipeTitle">{r.title}</h2>
              <p className="recipeText"> {r.ingredients}</p>
              <p className="recipeText"> {r.steps}</p>

              <div className="buttonGroup">
                <button onClick={() => handleEdit(r)} className="editButton">แก้ไข</button>
                <button onClick={() => handleDelete(r.id)} className="deleteButton">ลบ</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
