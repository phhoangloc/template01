import React, { useState, useEffect } from 'react'

type InputType = {
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isfocus?: (v: Boolean) => void
    type?: string
}

const Input = ({ name, value, onChange, isfocus, type }: InputType) => {
    const [focus, setFocus] = useState<Boolean>(false)

    useEffect(() => {
        isfocus && isfocus(focus)
    }, [focus])


    return (
        <div className='input'>
            <p className={`title ${focus ? "title_focus" : ""} ${value ? "title_focus" : ""}`}>{name}</p>
            <input type={type ? type : "text"} value={value} onChange={(e) => onChange(e)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
        </div>
    )
}

export default Input