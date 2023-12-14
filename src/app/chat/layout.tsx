import type { Metadata } from 'next'
import Header from '@/component/home/header'
import "../../style/home.css"
import Menu from '@/component/home/menu'
export const metadata: Metadata = {
  title: 'Lockheart | chat',
  icons: {
    icon: 'img/icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='home main center height'>
      <Header />
      <Menu />
      {children}
    </div>
  )
}
