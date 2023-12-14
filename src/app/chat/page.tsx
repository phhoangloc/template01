'use client'
import React, { useState, useEffect } from 'react'
import Loading from '@/component/item/loading'
import store from '@/redux/store'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PeopleIcon from '@mui/icons-material/People';
import Icon from '@/component/item/icon';
import Texterea from '@/component/item/texterea';
import Button from '@/component/item/button';
import AddIcon from '@mui/icons-material/Add';
import io from 'socket.io-client';
import CloseIcon from '@mui/icons-material/Close';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideoCall from '@/component/element/videoCall';

const Chat = () => {

    const [socket, setSocket] = useState<any>()
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const [welcomeText, setWelcomeText] = useState<string>("")
    const [noteText, setNoteText] = useState<string>("")
    const [msgArray, setMsgArray] = useState<any>([])
    const [online, setOnline] = useState<any>([])

    const isLogin = currentUser && Object.keys(currentUser).length ? true : false

    const [message, setMessage] = useState<string>("")
    const [userMessage, setUserMessage] = useState<any>()

    const [roomModal, setRoomModal] = useState<boolean>(false)

    const [isLoading, setIsloading] = useState<boolean>(false)
    const [onLiveRoom, setOnliveRoom] = useState<boolean>(false)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    useEffect(() => {
        update()
    })

    useEffect(() => {
        const socket = io(`${process.env.SERVER_URL}`);

        setSocket(socket)

        socket.on('msg', (data) => {

            if (data.type === "note") {
                setWelcomeText(data.msg)
            }
            if (data.type === "leave") {
                setNoteText(data.msg)
                setOnline(data.online)
            }
            if (data.type === "msg") {
                setUserMessage(data)
            }
        })

        socket.on('online', data => setOnline(data))

        return () => { socket.disconnect() }

    }, [])

    useEffect(() => {
        isLogin && socket.emit('user', { type: "note", name: currentUser.username, msg: "welcome to my Chat" })
    }, [isLogin])

    useEffect(() => {
        userMessage && setMsgArray([...msgArray, userMessage])
    }, [userMessage])

    const sendMsg = () => {
        setMessage("")
        socket.emit('user', { type: "msg", name: currentUser.username, msg: message })
    }

    const reCom =
        isLoading ? <Loading /> :
            !Object.keys(currentUser).length ?
                <p>Log In</p> :
                <div className='chat'>
                    <div className={`item room ${currentTheme ? "white" : "black"} ${roomModal ? "roomOpen" : ""}`}>
                        <div className="room_room">
                            <div className='item'><Icon icon={<ArrowRightIcon />} />room <Icon icon={<AddIcon />} /></div>
                            <div className="room_room_box"></div>
                        </div>
                        <div className="room_friend">
                            <div className='item'><Icon icon={<ArrowRightIcon />} />friend <Icon icon={<AddIcon />} /></div>
                            <div className="room_friend_box">
                                {online.map((item: any, index: number) => <p key={index}>{item}</p>)}
                            </div>
                        </div>
                        <Icon icon={<KeyboardBackspaceIcon onClick={() => setRoomModal(false)} />} />
                    </div>
                    <div className={`item chatbox center`}>
                        <Icon icon={<PeopleIcon onClick={() => setRoomModal(true)} />} />
                        <div className="message">
                            <p>{welcomeText}</p>
                            <p>{noteText}</p>
                            {msgArray.map((item: any, index: any) =>
                                <p key={index}
                                    className={`item ${currentTheme ? "white" : "black"} ${item.sender ? "" : "mrg_right_0 textRight"}`}>
                                    <span>{item.name}</span><br></br>{item.msg}
                                </p>)}
                        </div>
                        <div className="iconTool ">
                            <VideoCallIcon onClick={() => setOnliveRoom(true)} />
                        </div>
                        <div className="input_box">
                            <Texterea value={message} onChange={(e) => setMessage(e.target.value)} name='message' />
                            <Button func={() => sendMsg()} name="send" />
                        </div>


                    </div>
                    {onLiveRoom ?
                        <div className='call main center'>
                            <CloseIcon onClick={() => setOnliveRoom(false)} />
                            <VideoCall />
                        </div> :
                        null}
                </div>
    return reCom
}

export default Chat