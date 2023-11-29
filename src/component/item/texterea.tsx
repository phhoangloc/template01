import React from 'react'
import { useState, useEffect } from 'react'
type InputType = {
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    isfocus?: (v: Boolean) => void
    type?: string
    funcIcon?: () => void
    disabled?: boolean
}

const Texterea = ({ name, onChange, value, isfocus, disabled }: InputType) => {

    const [focus, setFocus] = useState<Boolean>(false)

    useEffect(() => {
        isfocus && isfocus(focus)
    }, [focus])

    return (
        <div className='input textarea'>
            <p className={`title ${focus ? "title_focus" : ""} ${value ? "title_focus" : ""}`}>{name}</p>
            <textarea value={value} onChange={(e) => onChange(e)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} disabled={disabled ? disabled : false} ></textarea>
        </div>
    )
}

export default Texterea