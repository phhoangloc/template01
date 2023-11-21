'use client'
import { useState } from 'react'
import store from '@/redux/store'
import Link from 'next/link';
export default function Home() {

  const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

  const update = () => {
    store.subscribe(() => setCurrentTheme(store.getState().theme))
  }

  update()
  return (
    <div className={`height center ${currentTheme ? "light" : "dark"}`}>
      <h1>Welcomet to My Template</h1>
      <Link href="/home" >Home</Link>
    </div>
  )
}
