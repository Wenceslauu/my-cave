import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ServerMessageContext } from '../contexts/ServerMessageContext'

import { loadPosts } from '../services/PostServices'

import Post from './Post'

function PostChunk({
    page,
    offset,
    posts,
    changePostsInState,
    handleDelete,
    handleLike
}) {
    const { setServerErrors, setShowServerErrors } = useContext(ServerMessageContext)

    const navigate = useNavigate()

    useEffect(() => {
        const loadPostsInState = (newPosts) => {
            changePostsInState((prevPosts) => [...prevPosts, ...newPosts])
        } 

        const fetchData = async () => {
            try {
                const data = await loadPosts(page, offset)

                loadPostsInState(data.posts)
            } catch (error) {
                setShowServerErrors(true)
                if (error.response.status === 401) {
                    setServerErrors([error.response.statusText])

                    localStorage.removeItem('user')
                    navigate('/login')
                } else 
                    setServerErrors([error.response.data.error])
                
            }
        }

        fetchData()
    }, [navigate, setServerErrors, setShowServerErrors, page, offset, changePostsInState])

    const postItems = posts.map((post) => {
        return (
            <Post key={post._id} post={post} handleDelete={() => {handleDelete(post._id)}} handleLike={() => {handleLike(post._id)}} />
        )
    })

    return postItems
}

export default PostChunk