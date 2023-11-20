import React from 'react'
import { IconType } from '@/type/icon'

const Icon = ({ icon }: IconType) => {
    return (
        <div className='Icon'>{icon}</div>
    )
}

export default Icon