import React, { Children } from 'react'
import Dashboard from './dashboard'

type Props = {
    pages?: string
}

const Content = ({ pages }: Props) => {

    switch (pages) {
        case "dashboard":
            return <Dashboard />
        case "book":
            return pages
        case "blog":
            return pages
        case "user":
            return pages
        default:
            return "Not Found"
    }
}

export default Content