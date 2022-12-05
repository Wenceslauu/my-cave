import { useCallback, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { loadPosts } from '../services/PostServices'

import { ServerErrorContext } from '../contexts/ServerErrorContext'

import Post from './Post'

function PostChunk({ page, offset, posts, changePostsInState }) {
    const { setServerErrors, setShowServerErrors } = useContext(ServerErrorContext)

    const navigate = useNavigate()

    const offsetRef = useRef(offset)
    
    // const loadPostsInState = useCallback((newPosts) => {
    //     changePostsInState((prevPosts) => [...prevPosts, ...newPosts])
    // }, [changePostsInState])

    useEffect(() => {
        const loadPostsInState = (newPosts) => {
            changePostsInState((prevPosts) => [...prevPosts, ...newPosts])
        } 

        const fetchData = async () => {
            try {
                console.log('offset:', offsetRef.current)
                const data = await loadPosts(page, offsetRef.current)

                console.log(data)
                loadPostsInState(data.posts)
            } catch (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem('user')
                    navigate('/login')
                } else {
                    setServerErrors([error.response.data.error])
                    setShowServerErrors(true)
                }
            }
        }

        fetchData()
    }, [navigate, setServerErrors, setShowServerErrors, page, offsetRef, changePostsInState])

    // function changeLikes(postID) {
        
    //     setPosts((prevPosts) => {
    //         const newPosts = prevPosts.map((post) => {
    //             if(post._id === postID) {
    //                 console.log('match')
    //                 if (post.likes) {}
    //             }
    //         })

    //         return newPosts
    //     })
    // }

    const postItems = posts.map((post) => {
        return (
            <Post key={post._id} post={post} />
        )
    })

    return postItems
}

export default PostChunk