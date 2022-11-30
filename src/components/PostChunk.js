import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loadPosts } from '../services/PostServices'

import { ServerErrorContext } from '../contexts/ServerErrorContext'

import Post from './Post'

function PostChunk({ page }) {
    const [posts, setPosts] = useState([])

    const { setServerErrors, setShowServerErrors } = useContext(ServerErrorContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadPosts(page)

                console.log(data)
                setPosts(data.posts)
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
    }, [navigate, setServerErrors, setShowServerErrors, page])

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