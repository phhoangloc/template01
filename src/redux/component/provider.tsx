'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { useRouter } from 'next/navigation'
import { setUser } from '../reducer/UserReduce'
import { setLoading } from '../reducer/LoadingReducer'
type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<{}>(store.getState().user)
    const [currentMenu, setCurrentMenu] = useState<{}>(store.getState().menu)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)
    const [currentLoading, setCurrentLoading] = useState<boolean>(store.getState().loading)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
        store.subscribe(() => setCurrentLoading(store.getState().loading))
    }

    update()

    const checkLogin = async () => {
        store.dispatch(setLoading(true))
        await fetch(process.env.SERVER_URL + "user", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                store.dispatch(setLoading(false))
                if (data.success) {
                    store.dispatch(setUser(data.data))
                } else {
                    store.dispatch(setUser({}))
                }
            })
    }

    useEffect(() => {
        checkLogin()
    }, [currentUpdate])

    return (
        <div className={`provider ${currentTheme ? "light" : "dark"}`}>{children}</div>
    )
}

export default Provider