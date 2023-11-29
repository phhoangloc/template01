'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@/component/element/form'
import store from '@/redux/store'
import Loading from '@/component/item/loading'
import Link from 'next/link'

const Admin = () => {


    const router = useRouter()

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentLoading, setCurrentLoading] = useState<boolean>(store.getState().loading)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentLoading(store.getState().loading))
    }

    const reCom = !currentLoading ?
        currentUser && currentUser.position === "admin" ?
            <div className=" main center height">
                <h1>welcome my Admin! <br></br>{currentUser.username}</h1>
                <Link href={"/admin/dashboard"}><h2>go to Dashboard</h2></Link>
            </div>
            :
            <div className=" main height center login">
                <Form />
            </div>
        :
        <Loading />


    update()

    return reCom
}

export default Admin