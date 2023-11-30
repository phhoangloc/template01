import React from 'react'

type Props = {
    item: any,
}

const SingleRight = ({ item }: Props) => {


    return (
        <>
            <div className='page center'>
                <p className='title'>{item && (item.name || item.title)}</p>
                <p className='author'>{item && item.author && (item.author.username || item.author)}</p>
            </div>
            <div className='page textJustify' dangerouslySetInnerHTML={{
                __html: item.detail
            }}
            />

        </>
    )
}

export default SingleRight