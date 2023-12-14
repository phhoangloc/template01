'use client'
import React, { useState, useEffect } from 'react'
import Input from '../item/input'
import store from '@/redux/store'
import Button from '../item/button'
import { useRouter } from 'next/navigation'
import { setUpdate } from '@/redux/reducer/UpdateReduce'
const Form = () => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    update()

    const router = useRouter()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [focus, setFocus] = useState<Boolean>(false)

    const [channel, setChannel] = useState<number>(0)

    const [errorsText, setErrorsText] = useState<any>()
    const [isErrors, setIsErrors] = useState<any>()

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
                } else {
                    console.log(data.message)
                }
            })
    }

    useEffect(() => {
        validateForm && validateForm();
    }, [username, password, email]);

    const validateForm = async () => {
        let errors: { username?: string, password?: string, email?: string } = {}

        if (username.length != 0 && 6 > username.length) {
            errors.username = 'username must be at least than 6'
        }
        if (username) {
            const isUsername = await fetch(process.env.SERVER_URL + "userexist?username=" + username)
                .then((res) => res.json())
                .then((data) => data)

            if (isUsername.success) {
                errors.username = "this username is existed"
            }
        }
        if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
            errors.email = 'Email is invalid';
        }
        if (email) {
            const isEmail = await fetch(process.env.SERVER_URL + "userexist?email=" + email)
                .then((res) => res.json())
                .then((data) => data)
            if (isEmail.success) { errors.email = "this email is existed" }
        }
        if (password.length != 0 && password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        setIsErrors(Object.keys(errors).length || username === "" || password === "" || email === "" ? true : false);
        setErrorsText(errors)
    }


    const signup = async (body: any) => {
        await fetch(process.env.SERVER_URL + "signup", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                setUsername("")
                setPassword("")
                setEmail("")
                console.log(data.msg)
                router.push('/home/login')
            })
    }


    const reComeLogin =
        <div className={`form ${focus ? (currentTheme ? "light_plus5 form_focus" : "dark_plus5 form_focus") : ""}`}>
            <h1>Log In</h1>
            <Input name="username" onChange={(e) => setUsername(e.target.value)} value={username} isfocus={(v) => setFocus(v)} />
            <Input name="password" onChange={(e) => setPassword(e.target.value)} value={password} isfocus={(v) => setFocus(v)} type='password' />
            <Button name='Log In' func={() => login()} />
            <p className="linkform" onClick={() => setChannel(1)}>create a new account</p>
        </div>

    const reComeSignIn =
        <div className={`form ${focus ? (currentTheme ? "light_plus5 form_focus" : "dark_plus5 form_focus") : ""}`}>
            <h1>Log In</h1>
            <Input name="username" onChange={(e) => setUsername(e.target.value)} value={username} isfocus={(v) => setFocus(v)} warn={errorsText && errorsText.username} />
            <Input name="password" onChange={(e) => setPassword(e.target.value)} value={password} isfocus={(v) => setFocus(v)} type='password' warn={errorsText && errorsText.password} />
            <Input name="email" onChange={(e) => setEmail(e.target.value)} value={email} isfocus={(v) => setFocus(v)} warn={errorsText && errorsText.email} />
            <Button name='Sign Up' func={() => signup({ username, password, email })} />
            <p className="linkform" onClick={() => setChannel(0)}>Log In</p>
        </div>
    switch (channel) {
        case 0: return reComeLogin;
        case 1: return reComeSignIn

        default: return reComeLogin;
    }
}

export default Form