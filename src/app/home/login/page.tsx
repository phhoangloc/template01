'use client'
import React, { useState, useEffect } from 'react'
import Form from '@/component/element/form'
import SingleLeft from '@/component/element/singleLeft'
import store from '@/redux/store'

const Page = () => {
    const [currentTheme, setCurrentTheme] = useState(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const reCom =
        <div className='single'>
            <div className={`item xs12 sm12 md6 left center ${currentTheme ? "white" : "black"}`}>
                <SingleLeft img={'/img/coffee.jpg'} />
            </div>
            <div className={`item xs12 sm12 md6 right center `}>
                <Form />
            </div>
        </div>
    return reCom
}

export default Page