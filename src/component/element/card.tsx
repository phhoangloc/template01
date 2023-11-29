import React, { useState } from 'react'
import store from '@/redux/store'
type cardType = {

    img?: string,
    content: React.ReactNode
    className: string
    height?: string
    func?: () => void
}
const Card = ({ img, content, func, className, height }: cardType) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()
    return (
        <div className={`card center ${className} ${currentTheme ? "light_plus5" : "dark_plus5"}`} style={height ? { height: height } : {}}>
            {content}
        </div>
    )
}

export default Card