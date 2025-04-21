'use client'
import { useEffect, useState } from 'react'

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]) //เก็บลิสต์ของเมนูอาหารทั้งหมด
  const [form, setForm] = useState({ title: '', ingredients: '', steps: '', image_url: '' }) //เก็บค่าจาก input เพื่อสร้างเมนูใหม่

  const fetchRecipes = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`)
    const data = await res.json()
    setRecipes(data)
  }
  // ดึงข้อมูลจาก /api/recipes เมื่อหน้าโหลดใช้ใน useEffect ด้านล่าง

  const handleAdd = async (e) => {
    e.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({ title: '', ingredients: '', steps: '', image_url: '' })
    fetchRecipes()
  }
  //เมื่อกดปุ่ม “เพิ่ม” → ส่งข้อมูลไปยัง API ด้วย POSTเคลียร์ input แล้วโหลดข้อมูลใหม่ทันที

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchRecipes()
  }
  //เมื่อกดปุ่ม “ลบ” → ส่ง DELETE ไปยัง API พร้อม id ของเมนูลบแล้วโหลดข้อมูลใหม่

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <main style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', color: '#006699' }}>📚 เมนูอาหาร</h1>

      <form onSubmit={handleAdd} style={{ marginBottom: '2rem', backgroundColor: '#e3f2fd', padding: '1rem', borderRadius: '8px' }}>
        <h3>➕ เพิ่มเมนูอาหาร</h3>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="ชื่อเมนู" required style={{ marginRight: '1rem' }} />
        <input value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} placeholder="ส่วนผสม" required style={{ marginRight: '1rem' }} />
        <input value={form.steps} onChange={e => setForm({ ...form, steps: e.target.value })} placeholder="วิธีทำ" required style={{ marginRight: '1rem' }} />
        <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="ลิงก์รูป" />
        <button type="submit" style={{ marginLeft: '1rem', background: '#006699', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px' }}>เพิ่ม</button>
      </form>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {recipes.map(r => (
          <div key={r.id} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <img src={r.image_url} alt={r.title} style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#006699' }}>{r.title}</h2>
              <h3 style={{ marginTop: '1rem' }}>🧂 ส่วนผสม</h3>
              <ul style={{ paddingLeft: '1.25rem' }}>
                {r.ingredients.split(',').map((item, i) => (
                  <li key={i}>• {item.trim()}</li>
                ))}
              </ul>
              <h3 style={{ marginTop: '1rem' }}>👨‍🍳 วิธีทำ</h3>
              <p>{r.steps}</p>
              <button onClick={() => handleDelete(r.id)} style={{ marginTop: '1rem', color: '#d32f2f', border: 'none', background: 'none', cursor: 'pointer' }}>🗑️ ลบเมนูนี้</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
