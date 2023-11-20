'use client'
import { useState } from 'react'
import store from '@/redux/store'
import Icon from '@/component/item/icon'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import Header from '@/component/home/header';
import Link from 'next/link';
export default function Home() {

  const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

  const update = () => {
    store.subscribe(() => setCurrentTheme(store.getState().theme))
  }

  update()
  return (
    <div className={`main center ${currentTheme ? "light" : "dark"}`}>
      <h1>Welcomet to My Template</h1>
      <Link href="/home" >Home</Link>
    </div>
  )
}
