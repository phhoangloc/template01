import React, { Children } from 'react'
import Dashboard from './dashboard'
import Book from './book'
import Form from '../element/form'
import Blog from './blog'
import User from './user'
type Props = {
    pages?: string
}

const Content = ({ pages }: Props) => {
    switch (pages) {
        case "dashboard":
            return <Dashboard />
        case "book":
            return <Book />
        case "blog":
            return <Blog />
        case "user":
            return <User />
        default:
            return "Not Found"
    }
}

export default Content