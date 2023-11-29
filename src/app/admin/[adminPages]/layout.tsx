'use client'
import { useState } from "react"
import store from "@/redux/store"
import Narbar from "@/component/admin/narbar"
import Content from "@/component/admin/content"
import NotFound from "@/app/not-found"
import Loading from "@/component/item/loading"
export default function RootLayout({
    children, params
}: {
    children: React.ReactNode,
    params: { adminPages: string }
}) {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentLoading, setCurrentLoading] = useState<boolean>(store.getState().loading)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentLoading(store.getState().loading))
    }

    update()

    const reCom =
        !currentLoading ?
            Object.keys(currentUser).length && currentUser.position === "admin" ?
                <>
                    <Narbar pages={params.adminPages} />
                    {children}
                </> :
                <NotFound />
            :
            <Loading />

    return reCom

    return children
}
