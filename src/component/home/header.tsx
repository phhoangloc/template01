'use client'
import React, { useEffect, useState } from 'react'
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
import { setMenu } from '@/redux/reducer/MenuReducer';
const Header = () => {
    const router = useRouter()
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

    const [hover, setHover] = useState<boolean>(false)
    const logout = () => {
        router.push('/home');
        setModalOpen(false);
        store.dispatch(setUpdate(1));
        localStorage.clear()
    }

    return (
        <div className={`header `}>
            <div className={`box ${hover ? (currentTheme ? "boxHover light" : "boxHover dark") : ""}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <div className="icons left">
                    <MenuIcon onClick={() => store.dispatch(setMenu(true))} />
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
                    <div className={`modal ${modalOpen ? "open" : ""} ${currentTheme ? "white" : "black"}`}>
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