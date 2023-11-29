'use client'
import React, { useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import store from '@/redux/store';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setUpdate } from '@/redux/reducer/UpdateReduce';
import MenuIcon from '@mui/icons-material/Menu';
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

    update()

    const logout = () => {
        router.push('/admin');
        setModalOpen(false);
        store.dispatch(setUpdate(1));
        localStorage.clear()
    }

    return (
        <div className='header'>
            <div className="box">
                <div className="icons left">
                    <MenuIcon />
                </div>
                <div className="title"><h1 onClick={() => router.push("/home")}>Lockheart</h1></div>

                <div className="icons">
                    {currentTheme ? <DarkModeIcon onClick={() => store.dispatch(setTheme(!currentTheme))} /> : <LightModeIcon onClick={() => store.dispatch(setTheme(!currentTheme))} />}
                    {Object.keys(currentUser).length ?
                        <Image
                            src={currentUser.infor.avata}
                            alt="Picture of the author"
                            width={50}
                            height={50}
                            onClick={() => setModalOpen(!modalOpen)}
                        />
                        : <PersonIcon onClick={() => setModalOpen(!modalOpen)} />}
                    <div className={`modal ${modalOpen ? "open" : ""}`}>
                        {Object.keys(currentUser).length ?
                            <>
                                <p onClick={() => logout()}>Log Out</p>
                                <p onClick={() => { router.push("/home/profile"); setModalOpen(false) }}>Profile</p>
                            </> :
                            <p onClick={() => { router.push("/home/login"); setModalOpen(false) }}>Log In</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header