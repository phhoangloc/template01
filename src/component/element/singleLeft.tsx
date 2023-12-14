import React from 'react'
import Image from 'next/image'
type Props = {
    img: string
}

const SingleLeft = ({ img }: Props) => {
    return <img src={img === "/img/coffee.jpg" ? process.env.SERVER_URL + img : process.env.GOOGLE_URL + img} alt={img} width={500} height={500} />
}

export default SingleLeft