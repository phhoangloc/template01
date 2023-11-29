'use client'
import React, { useEffect, useState } from 'react'
import Card from '../element/card'
import GeneralCard from '../element/cardContent/generalCard'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
const Dashboard = () => {

    const router = useRouter()

    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUpdate(store.getState().update))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const [countAllBook, setCountAllBook] = useState<number>(0)
    const [countAllBlog, setCountAllBlog] = useState<number>(0)
    //getbook
    const getbookLength = async (token: Storage[string]) => {
        await fetch(process.env.SERVER_URL + "admin/books", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCountAllBook(data.data.length)
                }
            })
    }
    const getblogLength = async (token: Storage[string]) => {
        await fetch(process.env.SERVER_URL + "admin/blogs", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCountAllBlog(data.data.length)
                }
            })
    }

    useEffect(() => {
        getbookLength(localStorage.token)
        getblogLength(localStorage.token)
    }, [currentUpdate])

    return (
        <div className={`dashboard`}>
            <Card content={<GeneralCard name="BOOK" count={countAllBook} func={() => router.push('book')} />} className='xs12 sm6' />
            <Card content={<GeneralCard name="BLOG" count={countAllBlog} func={() => router.push('blog')} />} className='xs12 sm6 ' />
            <Card content="content" className='xs6 lg3 ' />
            <Card content="content" className='xs6 lg3 ' />
            <Card content="content" className='xs6 lg3 ' />
            <Card content="content" className='xs6 lg3 ' />
            <Card content="content" className='xs12' />
        </div>
    )
}

export default Dashboard