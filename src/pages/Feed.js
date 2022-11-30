import { useState } from 'react'

import Post from '../components/Post'
import PostChunk from '../components/PostChunk'

function Feed() {
    const [newPosts, setNewPosts] = useState([])

    const newPostItems = newPosts.map((post) => {
        return (
            <Post key={post._id} post={post} />
        )
    })

    return (
        <>
            <div className='flex gap-12 px-0 sm:px-8 md:px-40 items-start'>
                <div className='basis-0 grow-[3] bg-base-300 rounded-box p-4 min-w-0'>
                    <ul className='flex flex-col gap-4'>
                        {newPostItems}
                        <PostChunk page='0' />
                    </ul>
                </div>
                <div className='basis-0 grow-[1] bg-base-300 rounded-box p-4 hidden lg:block'>
                    friend suggestions
                </div>
            </div>
        </>
    )
}

export default Feed