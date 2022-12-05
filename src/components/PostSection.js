import { useState } from 'react'

import PostChunk from '../components/PostChunk'

const PostSection = () => {
    const [posts, setPosts] = useState([])
    const [offset, setOffset] = useState(0)

    const createPostInState = (post) => {
        setPosts((prevPosts) => [post, ...prevPosts])

        setOffset((prevOffset) => prevOffset + 1)
    }

    const deletePostInState = (postID) => {
        setPosts((prevPosts) => {
            const newPosts = prevPosts.filter((post) => post._id !== postID)

            return newPosts
        })

        setOffset((prevOffset) => prevOffset - 1)
    }

    return (
        <>
            <ul className='flex flex-col gap-4'>
                <PostChunk page='0' offset={offset} posts={posts.slice(0 + offset, 5 + offset)} changePostsInState={setPosts}/>
            </ul>
        </>
    )
}

export default PostSection