import React from 'react'

type GeneralCardType = {
    name: string
    func?: () => void
    bg?: string,
    className?: string
    count?: number
}

const GeneralCard = ({ name, func, bg, className, count }: GeneralCardType) => {
    return (
        <div
            className={`general_card center ${className}`}
            style={{ backgroundImage: `url(${bg})` }}
            onClick={() => func && func()}>
            <h3>{name}</h3>
            <h4>{count}</h4>
        </div>
    )
}

export default GeneralCard