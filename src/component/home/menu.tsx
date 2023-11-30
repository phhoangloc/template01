'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import CloseIcon from '@mui/icons-material/Close';
import { setMenu } from '@/redux/reducer/MenuReducer';
import { useRouter } from 'next/navigation';
const Menu = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const [modalOpen, setModalOpen] = useState(false)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    useEffect(() => {
        update()
    }, [])

    const router = useRouter()

    return (
        <div className={`menu ${currentMenu ? "menuOpen" : ""} ${currentTheme ? "white" : "black"}`}>
            <CloseIcon onClick={() => store.dispatch(setMenu(false))} />
            <div className={`item xs12 sm4 left center ${currentTheme ? "light" : "dark"}`}>
                <p onClick={() => { router.push("/home/about"); store.dispatch(setMenu(false)) }}>About</p>
                <p onClick={() => { router.push("/home/book"); store.dispatch(setMenu(false)) }}>Book</p>
                <p onClick={() => { router.push("/home/blog"); store.dispatch(setMenu(false)) }}>Blog</p>
                <p onClick={() => { router.push("/home/contact"); store.dispatch(setMenu(false)) }}>Contact</p>
            </div>
            <div className={`item xs0 sm8 right center `}>
                <h1>Lockheart</h1>
            </div>
        </div>
    )
}

export default Menu