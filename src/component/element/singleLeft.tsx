import React from 'react'
import Image from 'next/image'
type Props = {
    img: string
}

const SingleLeft = ({ img }: Props) => {
    return <Image src={process.env.SERVER_URL + img} alt={img} width={500} height={500} priority={true} />
}

export default SingleLeft