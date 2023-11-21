'use client'
import Content from '@/component/admin/content'
import Dashboard from '@/component/admin/dashboard'
import Header from '@/component/admin/header'
import Narbar from '@/component/admin/narbar'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
type Props = {
    params: { adminPages: string }
}

const Admin = ({ params }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const router = useRouter()

    useEffect(() => {
        if (currentUser && currentUser.position !== "admin") { router.push('/admin') }
    }, [])

    return (
        <>
            <Narbar pages={params.adminPages} />
            <div className={`content center ${currentTheme ? "white" : "black"}`}>
                <Content pages={params.adminPages} />
            </div>
        </>
    )
}

export default Admin