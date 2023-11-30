'use client'
import React, { useState, useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import store from '@/redux/store';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setUpdate } from '@/redux/reducer/UpdateReduce';
const Header = () => {
    const router = useRouter()
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const [modalOpen, setModalOpen] = useState(false)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }


    useEffect(() => {
        update()
    })

    const logout = () => {
        router.push('/admin');
        setModalOpen(false);
        store.dispatch(setUpdate(1));
        localStorage.clear()
    }

    return (
        <div className='header'>
            <div className="box">
                <div className="icons">
                    <NotificationsIcon />
                    {currentTheme ? <DarkModeIcon onClick={() => store.dispatch(setTheme(!currentTheme))} /> : <LightModeIcon onClick={() => store.dispatch(setTheme(!currentTheme))} />}
                    {Object.keys(currentUser).length ?
                        <Image
                            src={currentUser.infor.avata}
                            alt="Picture of the author"
                            width={50}
                            height={50}
                            onClick={() => setModalOpen(!modalOpen)}
                            priority={true}
                        />
                        : <PersonIcon />}
                    <div className={`modal ${modalOpen ? "open" : ""}`}>
                        <p onClick={() => logout()}>Log Out</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header