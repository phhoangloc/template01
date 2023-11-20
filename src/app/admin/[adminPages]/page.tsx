'use client'
import Content from '@/component/admin/content'
import Dashboard from '@/component/admin/dashboard'
import Header from '@/component/admin/header'
import Narbar from '@/component/admin/narbar'
import React, { useState } from 'react'
import store from '@/redux/store'

type Props = {
    params: { adminPages: string }
}

const Admin = ({ params }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

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