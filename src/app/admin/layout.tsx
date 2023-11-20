import type { Metadata } from 'next'
import '../../style/admin.css'
import Header from '@/component/admin/header'
import Narbar from '@/component/admin/narbar'
export const metadata: Metadata = {
    title: 'Lockheart | admin',

}


export default function RootLayout({
    children
}: {
    children: React.ReactNode,

}) {
    return (
        <div className="admin">
            <Header />
            <div className="flexbox">
                {children}
            </div>
        </div>
    )
}
