import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DateTime } from 'luxon'

import { toggleLike } from '../services/PostServices'

import { ServerErrorContext } from '../contexts/ServerErrorContext'

import Avatar from '../components/Avatar'
import CommentChunk from './CommentChunk'

function Post({ post }) {
    const [showComments, setShowComments] = useState(false)

    const { setServerErrors, setShowServerErrors } = useContext(ServerErrorContext)

    const navigate = useNavigate()

    const handleLike = async () => {
        try {
            const data = await toggleLike(post._id)

            console.log(data) //change here
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

    return (
        <li>
            <div className="p-4 pb-2 rounded-box bg-secondary">
                <div className='flex items-center justify-between'>
                    <Link to={`/profile/${post.user._id}`} className='flex items-center gap-4 hover:outline hover:outline-secondary-content rounded-box min-w-0'>
                        <Avatar src={post.user.photo} alt="Post author" />
                        <span className='pr-2 truncate'>
                            {post.user.username}
                        </span>
                    </Link>
                    <span className='block lg:hidden shrink-0'>
                        {DateTime.fromJSDate(new Date(post.date)).toLocaleString(DateTime.DATETIME_SHORT)}
                    </span>
                    <span className='hidden lg:block shrink-0'>
                        {DateTime.fromJSDate(new Date(post.date)).toLocaleString(DateTime.DATETIME_MED)}
                    </span>
                </div>
                <div className='ml-12 px-2 py-2 whitespace-normal break-words [hyphens:auto]'>{post.text}</div>
                {(showComments) ? <CommentChunk post={post}/> : null}
                <div className='flex justify-evenly items-center gap-4 mt-4'>
                    <button onClick={() => setShowComments((prevShowComments) => !prevShowComments)} className="btn flex-1 md:w-1/2 md:flex-none">
                        {(showComments) ? 'Hide comments' : 'Show comments'}
                    </button>
                    <div className='flex items-center md:gap-2'>
                        <button onClick={handleLike} className="btn gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            {post.likes.length}
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Post