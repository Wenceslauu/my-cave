import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loadComments, writeComment } from '../services/CommentServices'

import { ServerErrorContext } from '../contexts/ServerErrorContext'

import Comment from './Comment'
import Input from './Input'

function CommentSection({ post }) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [clientError, setClientError] = useState('')

    const { setServerErrors, setShowServerErrors } = useContext(ServerErrorContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadComments(post._id)

                console.log(data)
                setComments(data.comments)
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
            await writeComment({text: newComment}, post._id)

            setComments((prevComments) => {
                return [newComment, ...prevComments]
            })
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

    const commentItems = comments.map((comment) => {
        return (
            <Comment key={comment._id} comment={comment} />
        )
    })

    return (
        <div className='ml-0 sm:ml-12 my-2 flex flex-col gap-4'>
            <form onSubmit={handleSubmit}>
                <Input
                    type='text'
                    field='text'
                    label='Text'
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
        </div>
    )
}

export default CommentSection