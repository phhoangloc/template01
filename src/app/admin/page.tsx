'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@/component/element/form'
import store from '@/redux/store'
const Admin = () => {

    const router = useRouter()

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    useEffect(() => {
        if (currentUser.position == "admin") {
            router.push("/admin/dashboard")
        }
    }, [currentUser])

    return (
        <>
            <div className=" main heightwidthHeader center login">
                <Form />
            </div>
        </>
    )
}

export default Admin