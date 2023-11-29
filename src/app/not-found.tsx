import Link from 'next/link'
import React from 'react'


const NotFound = () => {
    return (
        <div className='main center height'>
            <h1>Opp!</h1>
            <h3> Page Not Found</h3>
            <Link href={"/"}><h2>Home</h2></Link>
        </div>
    )
}

export default NotFound