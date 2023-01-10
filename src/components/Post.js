import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

import { UserContext } from '../contexts/UserContext'

import Avatar from '../components/Avatar'
import CommentSection from './CommentSection'

function Post({ 
    post,
    handleDelete,
    handleLike,
    actions=true,
    newUserPic
}) {
    const [showComments, setShowComments] = useState(false)

    const user = useContext(UserContext)

    return (
        <li>
            <div className={`p-4 ${(actions) ? 'pb-2' : 'pb-6'} rounded-box bg-secondary`}>
                <div className='flex items-center justify-between'>
                    <Link to={`/users/${post.user._id}`} className='flex items-center gap-4 hover:outline hover:outline-secondary-content rounded-full min-w-0'>
                        <Avatar src={(newUserPic) ? (newUserPic) : post.user.photo} alt="Post author" customWidth='avatar-pic' />
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
                <div className='ml-12 px-2 pt-2 whitespace-normal break-words [hyphens:auto]'>{post.text}</div>
                {(actions && showComments) ? <CommentSection post={post}/> : null}
                {(actions) ? 
                    <div className='flex justify-around items-center gap-4 mt-4'>
                        <button onClick={() => setShowComments((prevShowComments) => !prevShowComments)} className="btn flex-1 md:w-1/2 md:flex-none">
                            {(showComments) ? 'Hide comments' : 'Show comments'}
                        </button>
                        <div className='flex items-center md:gap-2 w-16'>
                            <button onClick={handleLike} className="btn gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${(post.likes.includes(user._id)) ? 'fill-error stroke-error' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                {post.likes.length}
                            </button>
                        </div>
                        <button onClick={handleDelete} className={`btn btn-error ${(post.user._id === user._id) ? '' : 'invisible'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg>
                        </button>
                    </div>
                : null}
            </div>
        </li>
    )
}

export default Post