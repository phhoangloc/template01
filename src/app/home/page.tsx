'use client'
import Parallax from '@/component/element/parallax'
import React, { useEffect } from 'react'
import { useState } from 'react'
import '../../style/home.css'
import Header from '@/component/home/header'
import Loading from '@/component/item/loading'

const Home = () => {

    const [books, setBooks] = useState<any>([])
    const [blogs, setBlogs] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getbooks = async () => {
        await fetch(process.env.SERVER_URL + "book", {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setBooks(data.data)
                }
            })
    }
    const getblogs = async () => {

        await fetch(process.env.SERVER_URL + "blog", {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setBlogs(data.data)
                }
            })
    }

    useEffect(() => {
        getbooks()
        getblogs()
        setIsLoading(false)

    }, [])

    const parallaxData = [...books, ...blogs]

    return (
        <>
            {isLoading ? <Loading /> : <Parallax data={parallaxData} />}
        </>
    )
}

export default Home