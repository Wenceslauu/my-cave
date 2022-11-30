import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

import Avatar from "./Avatar"

function Comment({ comment }) {
    return (
            <li className='rounded-box bg-secondary-content p-4 pb-2'>
                <div className='flex items-center justify-between'>
                    <Link to={`/profile/${comment.user._id}`} className='flex items-center gap-4 hover:outline hover:outline-secondary rounded-box min-w-0'>
                        <Avatar src={comment.user.photo} alt="Comment author" />
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
            </li>
    )
}

export default Comment