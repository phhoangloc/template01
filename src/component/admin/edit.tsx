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
import axios from 'axios'
import Loading from '../item/loading'
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

    const [loading, setLoading] = useState(true)

    const EditBook = () => {
        const router = useRouter()
        const [book, setBook] = useState<any>()

        const [img, setImg] = useState<any>(currentUser.img)
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
            name, author, slug, detail, slogan, img
        }

        const getbook = async () => {
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
            }
        }

        const uploadCover = async (file: File) => {
            if (file) {
                const formData = new FormData()
                formData.append("file", file)
                const fileUpload = await axios.post(process.env.SERVER_URL + "admin/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.token,
                    },
                })
                return fileUpload.data
            }

        }

        const updatebook = async (id: string, imgFile: File) => {
            const img = imgFile ? await uploadCover(imgFile) : currentUser.img
            body.img = img
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
                                    <Image src={process.env.GOOGLE_URL + book.img} width={100} height={100} alt='image'
                                    /> :
                                    <Image src={process.env.SERVER_URL + "img/bookcover/bookcoverDefault.jpeg"} width={100} height={100} alt='image' priority={true}
                                    />
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
                <Button name={book && book._id ? "save" : "create"} func={() => updatebook(book && book._id, imgFile)} />
            </div>
        )
    }
    const EditBlog = () => {
        const router = useRouter()
        const [book, setBook] = useState<any>()

        const [img, setImg] = useState<any>(currentUser.cover)
        const [imgPre, setImgPre] = useState<any>()
        const [imgFile, setImgFile] = useState<any>()

        const [name, setName] = useState<string>("")
        const [genre, setGenre] = useState<string>("blog")
        const [author, setAuthor] = useState<string>("")
        const [slug, setSlug] = useState<string>(currentslug)
        const [detail, setDetail] = useState<string>("")

        const body = {
            title: name,
            slug,
            detail,
            cover: img
        }

        const getbook = async () => {
            await fetch(process.env.SERVER_URL + "admin/blogs?slug=" + currentslug, {
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
                        setName(data.data[0].title)
                        setAuthor(data.data[0].author.username)
                        setSlug(data.data[0].slug)
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

        const uploadCover = async (file: File) => {
            if (file) {
                const formData = new FormData()
                formData.append("file", file)
                const fileUpload = await axios.post(process.env.SERVER_URL + "admin/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.token,
                    },
                })
                return fileUpload.data
            }

        }

        const updatebook = async (id: string, imgFile: File) => {
            const img = imgFile ? await uploadCover(imgFile) : currentUser.img
            body.cover = img
            if (id) {
                await fetch(process.env.SERVER_URL + "admin/blogs/" + id, {
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
                await fetch(process.env.SERVER_URL + "admin/blogs/", {
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
                        router.push("/admin/blog/" + slug)
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
                                <img src={imgPre} width={100} height={100} alt="hello" /> :
                                book && book.cover ?
                                    <Image src={process.env.GOOGLE_URL + book.cover} width={100} height={100} alt='img'
                                    /> :
                                    <img src={process.env.SERVER_URL + "img/bookcover/bookcoverDefault.jpeg"} width={100} height={100} alt='image'
                                    />
                        }
                    </div>
                    <p>{img && img} <span onClick={() => { setImgPre(null); setImg(null); setImgFile(null) }}>{img && "x"}</span></p>
                    <UploadButton icon={<UploadIcon />} func={(e) => getFile(e)} />
                </div>
                <Input name="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input name={currentUser.username} value={author} onChange={(e) => setAuthor(e.target.value)} disabled={true} />
                <Input name="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                <Texterea value={detail} name="Detail" onChange={(e) => setDetail(e.target.value)} />
                {book && book._id ? <p>createDate:{book && book.createDate}</p> : null}
                <Button name={book && book._id ? "save" : "create"} func={() => updatebook(book && book._id, imgFile)} />
            </div>
        )
    }
    const EditUser = () => {

        const [users, setUsers] = useState<any>()
        const [id, setId] = useState<string>("")
        const [username, setUsername] = useState<string>("")
        const [password, setPassword] = useState<string>("")
        const [email, setEmail] = useState<string>("")
        const [position, setPosition] = useState<string>("")
        const [active, setActive] = useState<boolean>(false)
        const [infor, setInfor] = useState<any>()

        const [fullname, setFullname] = useState<string>("")
        const [address, setAddress] = useState<string>("")
        const [phone, setPhone] = useState<string>("")
        const [img, setImg] = useState<any>("")
        const [imgPre, setImgPre] = useState<any>()
        const [imgFile, setImgFile] = useState<any>()

        const body = {
            // username,
            // password,
            // email,
            position,
            active,
            infor: {
                fullname,
                address,
                phone,
                avata: img,
            }
        }
        const getUser = async () => {
            await fetch(process.env.SERVER_URL + "admin/users?username=" + currentslug, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                },
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setUsers(data.data[0])
                        setLoading(false)

                        setId(data.data[0]._id)
                        setUsername(data.data[0].username)
                        setPassword(data.data[0].password)
                        setEmail(data.data[0].email)
                        setPosition(data.data[0].position)
                        setActive(data.data[0].active)
                        setInfor(data.data[0].infor)
                        if (data.data[0].infor) {
                            setFullname(data.data[0].infor.fullname)
                            setAddress(data.data[0].infor.address)
                            setPhone(data.data[0].infor.phone)

                            setImg(data.data[0].infor.avata)
                        }
                    }
                })
        }

        const getFile = async (e: any) => {
            var file = e.target.files[0];
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setImgPre(reader.result)
                setImgFile(file)
            }
        }

        useEffect(() => {
            getUser()
        }, [currentUpdate])

        const uploadCover = async (file: File) => {
            if (file) {
                const formData = new FormData()
                formData.append("file", file)
                const fileUpload = await axios.post(process.env.SERVER_URL + "admin/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.token,
                    },
                })
                return fileUpload.data
            }

        }

        const updateUser = async (id: string, imgFile: File) => {
            const img = imgFile ? await uploadCover(imgFile) : currentUser.img
            body.infor.avata = img
            body.infor.fullname = fullname
            body.infor.address = address
            body.infor.phone = phone
            if (id) {
                await fetch(process.env.SERVER_URL + "admin/users/" + id, {
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
                await fetch(process.env.SERVER_URL + "admin/users/", {
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
                    })
            }
        }

        const reCom =
            // users ?
            <div className="edit flex-wrap">
                <div className="xs12 md6 item avata">
                    <Image src={imgPre || (users && users.infor && process.env.GOOGLE_URL + users.infor.avata)} width={100} height={100} alt='avata' />
                    <UploadButton icon={<UploadIcon />} func={(e) => getFile(e)} />
                </div>
                <div className="xs12 md6 item user">
                    <Input name="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input name="Password" value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                    <Input name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input name="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
                    <p>active : {users && users.active ? "true" : "false"} </p>
                </div>
                <div className="xs12 md12 item infor">
                    <h3>INFOR</h3>
                    <Input name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    <Input name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <Input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Input name="avata" value={img} onChange={() => null} disabled={true} />

                </div>
                <Button name={"save"} func={() => updateUser(id, imgFile)} />
            </div>
        // : <Loading />

        return reCom
    }

    switch (pages) {
        case "book": return <EditBook />
        case "blog": return <EditBlog />
        case "user": return <EditUser />
        default: return <NotFound />
    }

}

export default Edit