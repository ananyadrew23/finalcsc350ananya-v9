'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(['example'])
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-12 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-6">Welcome to the Recipe App</h1>
        <p className="text-lg text-blue-600 mb-8">รวมเมนูอาหารแสนอร่อยให้คุณลองทำเองที่บ้าน 🍳</p>
        <Link href="/recipes" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">
          ดูเมนูอาหารทั้งหมด
        </Link>
      </div>
    </main>
  )
}