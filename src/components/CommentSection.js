import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts/UserContext'
import { ServerMessageContext } from '../contexts/ServerMessageContext'

import { loadComments, writeComment, deleteComment } from '../services/CommentServices'

import Comment from './Comment'
import Input from './Input'

function CommentSection({ post }) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [clientError, setClientError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const user = useContext(UserContext)

    const { setServerErrors, setShowServerErrors, setServerSuccesses, setShowServerSuccesses } = useContext(ServerMessageContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await loadComments(post._id)
                setLoading(false)

                setComments(data.comments)
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
    }, [navigate, setServerErrors, setShowServerErrors, post._id])

    const handleChange = (e) => {
        const target = e.target
        setNewComment(target.value)

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
            const data = await writeComment({ text: newComment }, post._id)

            const fullNewComment = {
                text: newComment,
                post: post._id,
                user: user,
                date: data.commentDate,
                _id: data.commentID
            }

            setComments((prevComments) => [fullNewComment, ...prevComments])

            setNewComment('')

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

    const handleDelete = async (commentID) => {
        try {
            const data = await deleteComment(post._id, commentID)

            setComments((prevComments) => {
                const newComments = prevComments.filter((comment) => comment._id !== commentID)

                return newComments
            })

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

    const commentItems = comments.map((comment) => {
        return (
            <Comment key={comment._id} comment={comment} handleDelete={() => handleDelete(comment._id)} />
        )
    })

    return (
        <div className={`ml-0 sm:ml-12 my-2 ${(comments.length === 0) ? 'mb-[-16px]' : ''} flex flex-col gap-4`}>
            <form onSubmit={handleSubmit} noValidate>
                <Input
                    type='text'
                    field='text'
                    placeholder="Go ahead and write a comment, don't be shy!"
                    value={newComment}
                    onChange={handleChange}
                    error={clientError}
                    required
                />
            </form>
            <ul className='flex flex-col gap-4 text-black'>
                {commentItems}
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

export default CommentSection