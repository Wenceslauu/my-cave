import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

import { UserContext } from '../contexts/UserContext'

import Avatar from "./Avatar"

function Comment({ comment, handleDelete }) {
    const user = useContext(UserContext)

    return (
            <li className='rounded-box bg-secondary-content p-4 pb-2'>
                <div className='flex items-center justify-between'>
                    <Link to={`/users/${comment.user._id}`} className='flex items-center gap-4 hover:outline hover:outline-secondary rounded-full min-w-0'>
                        <Avatar src={comment.user.photo} alt="Comment author" customWidth='avatar-pic' />
                        <span className='pr-2 truncate'>
                            {comment.user.username}
                        </span>
                    </Link>
                    <span className='block lg:hidden shrink-0'>
                        {DateTime.fromJSDate(new Date(comment.date)).toLocaleString(DateTime.DATETIME_SHORT)}
                    </span>
                    <span className='hidden lg:block shrink-0'>
                        {DateTime.fromJSDate(new Date(comment.date)).toLocaleString(DateTime.DATETIME_MED)}
                    </span>
                </div>
                <div className='ml-12 px-2 py-2 whitespace-normal break-words [hyphens:auto]'>{comment.text}</div>
                { (comment.user._id === user._id) ? 
                    <div className='flex justify-end'>
                        <button onClick={handleDelete} className='btn btn-error'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg>
                        </button>
                    </div>
                    : null
                }
            </li>
    )
}

export default Comment