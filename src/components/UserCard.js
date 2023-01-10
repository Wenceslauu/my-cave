import { Link } from 'react-router-dom'

import Avatar from './Avatar'

function UserCard({ user }) {
    return (
        <li>
            <Link to={`/users/${user._id}`}>
                <div className="card bg-base-300 shadow-xl hover:outline hover:outline-2 hover:outline-secondary">
                    <div className="px-10 pt-10 flex justify-center">
                        <Avatar src={user.photo} alt={user.username} />
                    </div>       
                    <div className="card-body items-center text-center truncate">
                        <h2 className="card-title mb-4">{user.username}</h2>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default UserCard