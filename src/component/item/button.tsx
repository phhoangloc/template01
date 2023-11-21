import React from 'react'

type ButtonType = {
    name: string,
    func?: () => void
}

const Button = ({ name, func }: ButtonType) => {
    return (
        <button onClick={() => func && func()}>{name}</button>
    )
}

export default Button