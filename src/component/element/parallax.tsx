'use client'
import React, { useRef, useState } from 'react'
import ParallaxCard from './cardContent/parallaxCard'

type parallaxType = {
    data: any[]
}

const Parallax = ({ data }: parallaxType) => {

    const mainRef: React.MutableRefObject<any> = useRef({ scrollTop: 0, scrollLeft: 0 })
    const scrollRef: React.MutableRefObject<any> = useRef()
    const parallaxLoad = () => {
        mainRef.current.scrollLeft = (scrollRef.current.scrollWidth - screen.availWidth) / 2
        mainRef.current.scrollTop = 0
        setScrollStartX(mainRef.current.scrollLeft);
        setScrollStartY(mainRef.current.scrollTop);
    };
    const [mouseDown, setMouseDown] = useState<boolean>(false)
    const [scrollStartX, setScrollStartX] = useState<number>(0)
    const [scrollStartY, setScrollStartY] = useState<number>(0)
    type mousePositionType = {
        x: number
        y: number
    }
    const [mousePositionStart, setMousePositionStart] = useState<mousePositionType>({ x: 0, y: 0 })

    const getMousePosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (mouseDown) {
            mainRef.current.scrollLeft = scrollStartX + (mousePositionStart.x - e.clientX)
            mainRef.current.scrollTop = scrollStartY + (mousePositionStart.y - e.clientY)
        }
    }

    const reCom =
        <div className="parallaxs"
            ref={mainRef}
            onMouseDown={(e) => { setMouseDown(true), setMousePositionStart({ x: e.clientX, y: e.clientY }) }}
            onLoad={() => parallaxLoad()}
        >
            <div className="parallaxBox"
                ref={scrollRef}>
                {
                    data && data.length ?
                        data.map((item, index) =>
                            <ParallaxCard
                                slug={item.slug}
                                key={index}
                                genre={item.genre}
                                name={item.name || item.title}
                                img={(item.img && process.env.GOOGLE_URL + item.img) || (item.cover && process.env.GOOGLE_URL + item.cover)}
                            />
                        )
                        :
                        "no data"
                }
            </div>
        </div>

    return reCom
}

export default Parallax