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
import { setUpdate } from '@/redux/reducer/UpdateReduce';
import AddIcon from '@mui/icons-material/Add';

type funcParam = {
    search?: string,
    sortby?: string,
}
const Blog = () => {

    const router = useRouter()

    const [blogs, setBlogs] = useState<any>()
    const [search, setSearch] = useState<string>("")
    const [sortby, setSortBy] = useState<string>("")

    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    update()

    const getbooks = async ({ search, sortby }: funcParam) => {
        console.log()
        await fetch(process.env.SERVER_URL + "admin/blogs?search=" + search + "&sort=" + sortby, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setBlogs(data.data)
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
        // console.log(id)
        await fetch(process.env.SERVER_URL + "admin/blogs/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                store.dispatch(setUpdate(1))
            })
    }
    return (
        <div className='items'>
            <div className="tool">
                <Input name="search" value={search} onChange={(e) => setSearch(e.target.value)} icon={<SearchIcon />} />
                <div className="icons">
                    <RefreshIcon onClick={() => { setSortBy(""); setSearch("") }} />
                    <SortByAlphaIcon onClick={() => setSortBy(sortby != "title" ? "title" : "")} />
                    <AddIcon onClick={() => changePageEdit("newBlog", "blog")} />
                </div>
            </div>
            {blogs && blogs.map(
                (item: any, index: any) => <BookCard
                    key={index}
                    name={item.title}
                    icon1={<EditIcon onClick={() => changePageEdit(item.slug, item.genre)} />}
                    icon2={<DeleteIcon onClick={() => clickdelete(item._id)} />}
                />
            )}
        </div>
    )
}

export default Blog