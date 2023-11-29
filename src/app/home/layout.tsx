import type { Metadata } from 'next'
import Header from '@/component/home/header'
import "../../style/home.css"
export const metadata: Metadata = {
  title: 'Lockheart',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='main center height'>
      <Header />
      {children}
    </div>
  )
}
