import Image from 'next/image'
import React, { useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
type Props = {
    genre: string,
    name: string,
    img: string,
    slug: string,
}

const ParallaxCard = ({ genre, name, img, slug }: Props) => {
    const router = useRouter()
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()
    return (
        <div className={`item ${currentTheme ? "light_plus5" : "dark_plus5"}`} onClick={() => router.push(`/home/${genre}/${slug}`)}>
            <div className="picture">
                <img src={img} width={200} height={200} alt='itempic' />
            </div>
            <p>{genre}</p>
            <p>{name}</p>
        </div>
    )
}

export default ParallaxCard