'use client'
import { useState, useEffect } from 'react'
import store from '@/redux/store'
import Link from 'next/link';
export default function Home() {

  const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
  const [img, setImg] = useState<any>("")
  const update = () => {
    store.subscribe(() => setCurrentTheme(store.getState().theme))
  }

  useEffect(() => {
    update()
  })


  return (
    <div className={`main height center ${currentTheme ? "light" : "dark"}`}>
      <h1>Welcomet to My Template</h1>
      <div className="link">
        <h2 className='center'><Link href="/home" >Home</Link></h2>
        <h2 className='center'><Link href="/admin" >Admin</Link></h2>
        {/* <img src="https://drive.google.com/uc?id=1ep2pSgi0wPZc8eeYGdw-wciDXvdLEBKd" /> */}
      </div>
    </div>
  )
}
