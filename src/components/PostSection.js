import { useContext, useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts/UserContext'
import { ServerMessageContext } from '../contexts/ServerMessageContext'

import { loadPosts, writePost, deletePost, toggleLike } from '../services/PostServices'

import Input from './Input'
import Post from './Post'

function PostSection() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [newPost, setNewPost] = useState('')
    const [clientError, setClientError] = useState('')

    const offsetRef = useRef(0)
    const observer = useRef()
    const lastPostElementRef = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1)
            }
        })

        if (node) observer.current.observe(node)
    }, [loading, hasMore])
    
    const user = useContext(UserContext)

    const { setServerErrors, setShowServerErrors, setServerSuccesses, setShowServerSuccesses } = useContext(ServerMessageContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await loadPosts(page, offsetRef.current)
                setLoading(false)
                setHasMore(data.posts.length > 0)

                setPosts((prevPosts) => [...prevPosts, ...data.posts])
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
    }, [navigate, setServerErrors, setShowServerErrors, page])

    const handleChange = (e) => {
        const target = e.target
        setNewPost(target.value)

        if (target.validity.valid) 
            setClientError('')
        else
            setClientError('Please enter a message')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!e.target.checkValidity()) 
            return

        try {
            const data = await writePost({ text: newPost })

            const fullNewPost = {
                text: newPost,
                user: user,
                date: data.postDate,
                likes: [],
                _id: data.postID
            }

            setPosts((prevPosts) => [fullNewPost, ...prevPosts])

            offsetRef.current = offsetRef.current + 1

            setNewPost('')

            setServerSuccesses([data.success])
            setShowServerSuccesses(true)
        } catch (error) {
            setShowServerErrors(true)
            if (error.response.status === 401) {
                setServerErrors([error.response.statusText])

                localStorage.removeItem('user')
                navigate('/login')
            } else 
                setServerErrors(error.response.data.errors)
            
        }
    }

    const handleDelete = async (postID) => {
        try {
            const data = await deletePost(postID)

            setPosts((prevPosts) => {
                const newPosts = prevPosts.filter((post) => post._id !== postID)
    
                return newPosts
            })
    
            offsetRef.current = offsetRef.current - 1

            setServerSuccesses([data.success])
            setShowServerSuccesses(true)
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

    const handleLike = async (postID) => {
        try {
            await toggleLike(postID)

            setPosts((prevPosts) => {
                return (
                    prevPosts.map((prevPost) => {
                        if (prevPost._id === postID) {
                            let newLikes
                            if (prevPost.likes.includes(user._id)) {
                                newLikes = prevPost.likes.filter((like) => {
                                    return (like !== user._id)
                                })
                            } else {
                                newLikes = [...(prevPost.likes), user._id]
                            }

                            return {
                                ...prevPost,
                                likes: newLikes
                            }
                        }

                        return prevPost
                    })
                )
            })
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

    const postItems = posts.map((post, index) => {
        if (posts.length === index + 1) {
            return (
                <div ref={lastPostElementRef} key={post._id}>
                    <Post post={post} handleDelete={() => {handleDelete(post._id)}} handleLike={() => {handleLike(post._id)}}/>
                </div>
            )
        } else {
            return (
                <Post key={post._id} post={post} handleDelete={() => {handleDelete(post._id)}} handleLike={() => {handleLike(post._id)}}/>
            )
        }
    })

    return (
        <div className='flex flex-col gap-2'>
            <p className='text-3xl font-bold'>Feed</p>
            <form onSubmit={handleSubmit} noValidate>
                <Input
                    type='text'
                    field='text'
                    placeholder="Go ahead and write a post, don't be shy!"
                    value={newPost}
                    onChange={handleChange}
                    error={clientError}
                    required
                />
            </form>
            <ul className='flex flex-col gap-3'>
                { postItems }
            </ul>
            {loading && 
                <div className="lds-ripple mx-auto">
                    <div>
                        </div><div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PostSection