'use client'
import Content from '@/component/admin/content'
import Narbar from '@/component/admin/narbar'
import React, { useState } from 'react'
import store from '@/redux/store'
import Loading from '@/component/item/loading'
import NotFound from '@/app/not-found'
type Props = {
    params: { adminPages: string }
}

const Admin = ({ params }: Props) => {
    return (
        <div className={`content`}>
            <Content pages={params.adminPages} />
        </div>
    )
}

export default Admin