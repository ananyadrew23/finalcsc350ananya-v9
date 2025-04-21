export const metadata = {
  title: 'DelishShare | เมนูอาหาร',
  description: 'สูตรอาหารแสนอร่อย พร้อมวิธีทำอย่างละเอียด',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body style={{ fontFamily: 'Prompt, sans-serif', margin: 0, backgroundColor: '#f7f9fc' }}>
        {children}
      </body>
    </html>
  )
}
