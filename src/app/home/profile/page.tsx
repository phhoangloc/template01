'use client'
import store from '@/redux/store'
import React, { useState } from 'react'


type Props = {}

const Profile = (props: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    update()
    return (
        <div>
            welcome {currentUser.username} !
        </div>
    )
}

export default Profile