'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{
      padding: '3rem',
      textAlign: 'center',
      fontFamily: 'Prompt, sans-serif',
      backgroundColor: '#e3f2fd',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#006699', marginBottom: '1rem' }}>
        🍽️ ยินดีต้อนรับสู่ DelishShare
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        แหล่งรวมสูตรอาหารแสนอร่อย พร้อมวัตถุดิบและวิธีทำอย่างละเอียด
      </p>
      <Link href="/recipes">
        <button style={{
          backgroundColor: '#006699',
          color: 'white',
          border: 'none',
          padding: '0.8rem 1.5rem',
          fontSize: '1.1rem',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}>
          🍳 ดูเมนูอาหารทั้งหมด
        </button>
      </Link>
    </main>
  )
}
