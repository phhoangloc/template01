import React, { useState } from 'react'
import Input from '../item/input'
import store from '@/redux/store'
import Button from '../item/button'
const Form = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [focus, setFocus] = useState<Boolean>(false)

    const body = { username, password }

    const login = () => {
        console.log(body)
    }

    return (
        <div className={`form ${focus ? (currentTheme ? "light_plus5 form_focus" : "dark_plus5 form_focus") : ""}`}>
            <h1>Log In</h1>
            <Input name="username" onChange={(e) => setUsername(e.target.value)} value={username} isfocus={(v) => setFocus(v)} />
            <Input name="password" onChange={(e) => setPassword(e.target.value)} value={password} isfocus={(v) => setFocus(v)} type='password' />
            <Button name='Log In' func={() => login()} />
        </div>
    )
}

export default Form