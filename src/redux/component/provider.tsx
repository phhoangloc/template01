'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { useRouter } from 'next/navigation'
import { setUser } from '../reducer/UserReduce'
type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<{}>(store.getState().user)
    const [currnetUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    update()

    const checkLogin = async (token: Storage[string]) => {
        await fetch(process.env.SERVER_URL + "user", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    store.dispatch(setUser(data.data))
                }
            })
    }

    useEffect(() => {
        checkLogin(localStorage.token)
    }, [currnetUpdate])

    return (
        <div className={`provider ${currentTheme ? "light" : "dark"}`}>{children}</div>
    )
}

export default Provider