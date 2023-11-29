import React, { useState } from 'react'
import store from '@/redux/store'
type TitleCardType = {
    name: string,
    icon1?: React.ReactNode
    icon2?: React.ReactNode
}

const TitleCard = ({ name, icon1, icon2 }: TitleCardType) => {
    const [hover, setHover] = useState(false)

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    return (
        <div className={`titleCard ${hover ? (currentTheme ? "white" : "black") : ""}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <p>{name}</p>
            {icon1}
            {icon2}
        </div>
    )
}

export default TitleCard