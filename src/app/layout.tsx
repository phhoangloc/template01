import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import '../style/style.css'
import Provider from '@/redux/component/provider'
const RM = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lockheart',
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
    <html lang="en">
      <body className={RM.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
