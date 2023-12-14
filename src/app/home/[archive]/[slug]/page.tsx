'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import store from '@/redux/store'
import SingleLeft from '@/component/element/singleLeft'
import SingleRight from '@/component/element/singleRight'
import Loading from '@/component/item/loading'
import NotFound from '@/app/not-found'
type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })

    const [item, setitem] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getItems = async (a: string, s: string) => {
        setIsLoading(true)
        await fetch(process.env.SERVER_URL + a + "?slug=" + s, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setitem(data.data[0])
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                }
            }).catch((err: Error) => { setIsLoading(false) })
    }
    useEffect(() => {
        getItems(params.archive, params.slug)
    }, [])

    const reCom =
        isLoading ? <Loading /> :
            item && item._id ?
                <div className='single'>
                    <div className={`item xs12 sm12 md6 left center ${currentTheme ? "white" : "black"}`}>
                        <SingleLeft img={item.img || item.cover} />
                    </div>
                    <div className={`item xs12 sm12 md6 right `}>
                        <SingleRight item={item} />
                    </div>
                </div>
                : <NotFound />

    return reCom
}

export default Page