import React, { useState, useEffect } from 'react'

type InputType = {
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isfocus?: (v: Boolean) => void
    type?: string
    icon?: React.ReactNode
    funcIcon?: () => void
    disabled?: boolean
    warn?: string
}

const Input = ({ name, value, onChange, isfocus, type, icon, funcIcon, disabled, warn }: InputType) => {
    const [focus, setFocus] = useState<Boolean>(false)

    useEffect(() => {
        isfocus && isfocus(focus)
    }, [focus])


    return (
        <div className='input'>
            <p className={`title ${focus ? "title_focus" : ""} ${value ? "title_focus" : ""}`}>{name}</p>
            <input type={type ? type : "text"} value={value} onChange={(e) => onChange(e)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} disabled={disabled ? disabled : false} />
            {icon ? icon : null}
            <p className='warn'>{warn && warn}</p>
        </div>
    )
}

export default Input