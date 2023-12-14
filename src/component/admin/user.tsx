'use client'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import BookCard from '../element/cardContent/titleCard'
import Input from '../item/input'
import RefreshIcon from '@mui/icons-material/Refresh';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { setUpdate } from '@/redux/reducer/UpdateReduce'
type funcParam = {
    search?: string,
    sortby?: string,
}
const User = () => {

    const router = useRouter()

    const [users, setUsers] = useState<any>()
    const [search, setSearch] = useState<string>("")
    const [sortby, setSortBy] = useState<string>("")

    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    update()

    const getbooks = async ({ search, sortby }: funcParam) => {
        console.log()
        await fetch(process.env.SERVER_URL + "admin/users?search=" + search + "&sort=" + sortby, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUsers(data.data)
                }
            })
    }

    useEffect(() => {
        getbooks({ search, sortby: sortby })
    }, [currentUpdate, search, sortby])

    const changePageEdit = (i: any, p: string) => {
        router.push(`${p}/${i}`)
    }
    const clickdelete = async (id: any) => {
        await fetch(process.env.SERVER_URL + "admin/users/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.success)
                store.dispatch(setUpdate(1))
            })
    }
    return (
        <div className='items'>
            <div className="tool">
                <Input name="search" value={search} onChange={(e) => setSearch(e.target.value)} icon={<SearchIcon />} />
                <div className="icons">
                    <RefreshIcon onClick={() => { setSortBy(""); setSearch("") }} />
                    <SortByAlphaIcon onClick={() => setSortBy(sortby != "username" ? "username" : "")} />
                    <AddIcon onClick={() => changePageEdit("newuser", "user")} />
                </div>
            </div>
            {users && users.map(
                (item: any, index: any) =>
                    <BookCard
                        key={index}
                        name={item.username + "(" + item.position + ")"}
                        icon1={<EditIcon onClick={() => changePageEdit(item.username, "user")} />}
                        icon2={<DeleteIcon onClick={() => clickdelete(item._id)} />}
                    />
            )}
        </div>
    )
}

export default User