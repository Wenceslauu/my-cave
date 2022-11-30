import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loadComments } from '../services/CommentServices'

import { ServerErrorContext } from '../contexts/ServerErrorContext'

import Comment from './Comment'

function CommentChunk({ post }) {
    const [comments, setComments] = useState([])

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

    const commentItems = comments.map((comment) => {
        return (
            <Comment key={comment._id} comment={comment} />
        )
    })
    return (
        <div className='ml-0 sm:ml-12 my-2'>
            <ul className='flex flex-col gap-4 text-black'>
                {commentItems}
            </ul>
        </div>
    )
}

export default CommentChunk