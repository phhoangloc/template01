'use client'
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import store from '@/redux/store';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Peer from 'simple-peer'
const Chat = () => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentUpdate, setCurrentUpdate] = useState<number>(store.getState().update)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentUpdate(store.getState().update))
    }

    update()

    const [socket, setSocket] = useState<Socket>()
    const [welcome, setWelcome] = useState<string>("")
    const [notice, setNotice] = useState<string>("")
    const [online, setOnline] = useState<[]>([])

    const [onCall, setOnCall] = useState<boolean>(false)
    const [stream, setStream] = useState<MediaStream>()

    const mainVideo = useRef<any>("")
    const childVideo = useRef<any>("")
    const currentPeer = useRef<any>("")

    //function
    const leaveRoom = () => {

        const tracks = stream && stream.getTracks()
        tracks?.forEach((track: MediaStreamTrack) => {
            track.stop()
        })

        setOnCall(false)
    }

    useEffect(() => {
        const socket = io(`${process.env.SERVER_URL}`)
        setSocket(socket)

        socket.on("online", data => {
            setOnline(data.online)
            setWelcome(data.msg)

            setTimeout(() => {
                setWelcome("")
            }, 3000)
        })

        socket.on("msg", data => {
            if (data.type = "leave") {
                setNotice(data.msg)
                setTimeout(() => {
                    setNotice("")
                }, 3000)
            }
        })

        socket.on("webYou", data => {
            currentPeer.current.on("stream", (stream: MediaStream) => {
                childVideo.current ? childVideo.current.srcObject = stream : null

            })
            currentPeer.current.signal(data)
        })

        return () => { socket.disconnect() }
    }, [])

    useEffect(() => {
        currentUser.username && socket && socket.emit("user", { type: "welcome", name: currentUser.username })
    }, [currentUser.username])

    useEffect(() => {
        onCall && navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(currentStream => {
                setStream(currentStream)
                mainVideo.current ? mainVideo.current.srcObject = currentStream : null
            })
    }, [onCall])


    useEffect(() => {
        const peer = new Peer({ initiator: true, trickle: false, stream: stream })
        peer.on("signal", (data: Peer.SignalData) => {
            stream && socket && socket.emit("onWeb", data)
            currentPeer.current = peer
        })
    }, [socket, stream])

    const reCom =
        <div className="chat">
            <div className="friends">
                <div className='title'>
                    <p>New Message</p><MapsUgcIcon />

                </div>
                <div className='title'>
                    <p>New Call</p><VideoCallIcon onClick={() => setOnCall(true)} />
                </div>
                {online.map((item, index) => <p key={index} className='item'>{item}</p>)}

            </div>
            <div className={`callRoom  ${onCall ? "callRoomOpen" : null}`}>
                <button onClick={() => { leaveRoom() }}>leave room</button>
                <div className="mainVideo center">
                    <video ref={mainVideo} muted autoPlay playsInline />
                </div>
                <div className="childVideo">
                    <video ref={childVideo} autoPlay playsInline />
                </div>
            </div>
            <div className={`messageBox  ${onCall ? "messageBoxClose" : null}`}>
                {currentUser.username ? <p>hello {currentUser.username}</p> : <p>Loading...</p>}
                <p>{welcome}</p>
                <p>{notice}</p>
            </div>
        </div>

    return reCom
}

export default Chat