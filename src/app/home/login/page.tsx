'use client'
import React, { useState, useEffect } from 'react'
import Form from '@/component/element/form'
import SingleLeft from '@/component/element/singleLeft'
import store from '@/redux/store'
type Props = {}

const page = (props: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    }, [])
    const reCom =
        <div className='single'>
            <div className={`item xs12 sm6 md4 left center ${currentTheme ? "white" : "black"}`}>
                <SingleLeft img={'/img/coffee.jpg'} />
            </div>
            <div className={`item xs12 sm6 md8 right center `}>
                <Form />
            </div>
        </div>
    return reCom
}

export default page