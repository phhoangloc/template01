import React from 'react'

type Props = {
    icon: React.ReactNode
}

const Icon = ({ icon }: Props) => {
    return (
        <div className='icon'>{icon}</div>
    )
}

export default Icon