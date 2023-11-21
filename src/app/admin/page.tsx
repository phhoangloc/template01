'use client'
import Content from '@/component/admin/content'
import Header from '@/component/admin/header'
import Narbar from '@/component/admin/narbar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@/component/element/form'

const Admin = () => {

    const [isLogin, setIsLogin] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (isLogin) {
            router.push("/admin/dashboard")
        }
    }, [isLogin])
    return (
        <>
            <div className="main center login">
                <Form />
            </div>
        </>
    )
}

export default Admin