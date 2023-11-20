'use client'
import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import store from '@/redux/store';
store
type Props = {
    pages: string
}
const Narbar = ({ pages }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const [hover, setHoover] = useState(false)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const menuLists = [
        {
            name: "dashboard",
            icon: <HomeIcon />,
            url: "/admin/dashboard"
        },
        {
            name: "book",
            icon: <BookIcon />,
            url: "/admin/book"
        },
        {
            name: "blog",
            icon: <LibraryBooksIcon />,
            url: "/admin/blog",
        },
        {
            name: "user",
            icon: <PersonIcon />,
            url: "/admin/user"
        }
    ]
    return (
        <div className='narbar'>
            {
                menuLists.map((item, index) =>
                    <Link href={item.url} key={index} >
                        <div
                            className={`
                                icon 
                                ${pages === menuLists[index].name ? (currentTheme ? "white" : "black") : ""} 
                                ${hover ? (currentTheme ? "white" : "black") : ""}
                                `}
                            onMouseEnter={() => setHoover(true)}
                            onMouseLeave={() => setHoover(false)}>
                            {item.icon} <p>{item.name}</p>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}

export default Narbar