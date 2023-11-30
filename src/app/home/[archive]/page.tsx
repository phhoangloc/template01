'use client'
import Parallax from '@/component/element/parallax'
import React, { useState, useEffect } from 'react'
import Loading from '@/component/item/loading'
import NotFound from '@/app/not-found'
type Props = {
    params: { archive: string }
}

const Page = ({ params }: Props) => {

    const [items, setitems] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getItems = async (a: string) => {
        setIsLoading(true)
        await fetch(process.env.SERVER_URL + a, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setitems(data.data)
                }
                setIsLoading(false)
            })
            .catch((err: Error) => { setIsLoading(false) })
    }
    useEffect(() => {
        getItems(params.archive)
    }, [])
    const reCom =
        isLoading ? <Loading /> :
            items && items.length ?
                <div className='archive'>
                    <Parallax data={items} />
                </div>
                : <NotFound />
    return reCom
}

export default Page