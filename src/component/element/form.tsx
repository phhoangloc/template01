import React, { useState } from 'react'
import Input from '../item/input'
import store from '@/redux/store'
import Button from '../item/button'
import { useRouter } from 'next/navigation'
import { setUpdate } from '@/redux/reducer/UpdateReduce'
const Form = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    update()

    const router = useRouter()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [focus, setFocus] = useState<Boolean>(false)

    const body = { username, password }

    const login = async () => {
        await fetch(process.env.SERVER_URL + "login", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUsername("")
                    setPassword("")
                    localStorage.token = "Bearer " + data.data.token
                    store.dispatch(setUpdate(1))
                    router.push("/admin/dashboard")
                } else {
                    console.log(data.message)
                }
            })
        console.log(currentUpdate)
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