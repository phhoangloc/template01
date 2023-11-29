'use client'
import NotFound from '@/app/not-found'
import React, { useState } from 'react'
import store from '@/redux/store'
import Edit from '@/component/admin/edit'

type Props = {
    params: { adminPages: string, slug: string }
}

const PageDetail = ({ params }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentLoading, setCurrentLoading] = useState<boolean>(store.getState().loading)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentLoading(store.getState().loading))
    }

    update()


    if (Object.keys(currentUser).length && currentUser.position === "admin") {
        return <Edit currentslug={params.slug} pages={params.adminPages} />
    } else {
        return <NotFound />
    }

}

export default PageDetail