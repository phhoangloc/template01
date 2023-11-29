import Image from 'next/image'
import React, { useState } from 'react'
import store from '@/redux/store'
type Props = {
    genre: string,
    name: string,
    img: string
}

const ParallaxCard = ({ genre, name, img }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()
    return (
        <div className={`item ${currentTheme ? "white" : "black"}`}>
            <div className="picture">
                <Image src={img} width={200} height={200} alt='itempic' />
            </div>
            <p>{genre}</p>
            <p>{name}</p>
        </div>
    )
}

export default ParallaxCard