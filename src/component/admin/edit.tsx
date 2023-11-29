import NotFound from '@/app/not-found'
import React, { useEffect, useState } from 'react'
import Input from '../item/input'
import UploadButton from '../item/uploadButton'
import Image from 'next/image'
import Texterea from '../item/texterea'
import UploadIcon from '@mui/icons-material/Upload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '../item/button'
import store from '@/redux/store'
import { setUpdate } from '@/redux/reducer/UpdateReduce'
import { useRouter } from 'next/navigation'

type Props = {
    pages: string,
    currentslug: string
}

const Edit = ({ pages, currentslug }: Props) => {

    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)


    const update = () => {
        store.subscribe(() => setCurrentUpdate(store.getState().update))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const EditBook = () => {
        const router = useRouter()
        const [book, setBook] = useState<any>()

        const [img, setImg] = useState<any>()
        const [imgPre, setImgPre] = useState<any>()
        const [imgFile, setImgFile] = useState<any>()

        const [name, setName] = useState<string>("")
        const [genre, setGenre] = useState<string>("book")
        const [author, setAuthor] = useState<string>("")
        const [slug, setSlug] = useState<string>(currentslug)
        const [owner, setOwner] = useState<string>(currentUser.username)
        const [detail, setDetail] = useState<string>("")
        const [slogan, setSlogan] = useState<string>("")

        const body = {
            name, author, slug, detail, slogan
        }

        const getbook = async () => {
            console.log()
            await fetch(process.env.SERVER_URL + "admin/books?slug=" + currentslug, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                },
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setBook(data.data[0])
                        setGenre(data.data[0].genre)
                        setName(data.data[0].name)
                        setAuthor(data.data[0].author)
                        setSlug(data.data[0].slug)
                        setOwner(data.data[0].owner.username)
                        setSlogan(data.data[0].slogan)
                        setDetail(data.data[0].detail)
                    }
                })
        }

        useEffect(() => {
            getbook()
        }, [currentUpdate])

        const getFile = async (e: any) => {
            var file = e.target.files[0];
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setImgPre(reader.result)
                setImgFile(file)
                setImg(file.name)
            }
        }

        const updatebook = async (id: string) => {
            if (id) {
                await fetch(process.env.SERVER_URL + "admin/books/" + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.token
                    },
                    body: JSON.stringify(body),
                    method: 'PUT',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        store.dispatch(setUpdate(1))
                    })
            } else {
                await fetch(process.env.SERVER_URL + "admin/books/", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.token
                    },
                    body: JSON.stringify(body),
                    method: 'POST',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        store.dispatch(setUpdate(1))
                        router.push("/admin/book/" + slug)
                    })
            }
        }

        return (
            <div className='edit'>
                <Input name="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} disabled={true} />
                <div className="edit_image">
                    <div className='image_box'>
                        {
                            imgPre ?
                                <Image src={imgPre} width={100} height={100} alt="hello" /> :
                                book && book.img ?
                                    <Image src={process.env.SERVER_URL + book.img} width={100} height={100} alt='image' /> :
                                    <Image src={process.env.SERVER_URL + "img/bookcover/bookcoverDefault.jpeg"} width={100} height={100} alt='image' />
                        }
                    </div>
                    <p>{img && img} <span onClick={() => { setImgPre(null); setImg(null); setImgFile(null) }}>{img && "x"}</span></p>
                    <UploadButton icon={<UploadIcon />} func={(e) => getFile(e)} />
                </div>
                <div className="edit_pdf">
                    <p>Pdf file:</p>
                    <UploadButton icon={<UploadFileIcon />} func={() => console.log("ok")} />
                </div>
                <Input name="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input name="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <Input name="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                <Input name="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} disabled={true} />
                <Texterea value={detail} name="Detail" onChange={(e) => setDetail(e.target.value)} />
                <Texterea value={slogan} name="Slogan" onChange={(e) => setSlogan(e.target.value)} />
                {book && book._id ? <p>createDate:{book && book.createDate}</p> : null}
                <Button name={book && book._id ? "save" : "create"} func={() => updatebook(book && book._id)} />
            </div>
        )
    }

    switch (pages) {
        case "book":
            return <EditBook />
        default: return <NotFound />
    }

}

export default Edit