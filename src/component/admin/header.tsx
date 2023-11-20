'use client'
import React, { useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import store from '@/redux/store';
import { setTheme } from '@/redux/reducer/ThemeReduce';
const Header = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()
    return (
        <div className='header'>
            <div className="box">
                <h3 className="title">Lockheart</h3>
                <div className="icons">
                    <NotificationsIcon />
                    {currentTheme ? <DarkModeIcon onClick={() => store.dispatch(setTheme(!currentTheme))} /> : <LightModeIcon onClick={() => store.dispatch(setTheme(!currentTheme))} />}
                </div>
            </div>
        </div>
    )
}

export default Header