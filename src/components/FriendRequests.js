import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { loadFriendReqs } from '../services/FriendReqServices'
import { answerFriendReq } from '../services/FriendReqServices'

import { ServerErrorContext } from '../contexts/ServerErrorContext'
import Avatar from './Avatar'

function FriendRequests() {
    const [requestsNumber, setRequestsNumber] = useState(0)
    const [friendRequests, setFriendRequests] = useState([])

    const { setServerErrors, setShowServerErrors } = useContext(ServerErrorContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadFriendReqs()

                setFriendRequests(data.friendRequests)
                setRequestsNumber(data.requestsNumber)
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
    }, [navigate, setServerErrors, setShowServerErrors])

    const handleClick = async (answerBody, requestID) => {
        try {
            await answerFriendReq(answerBody, requestID)

            setRequestsNumber((prevRequestsNumber) => {
                return (prevRequestsNumber - 1)
            })
            setFriendRequests(friendRequests.filter(req => req._id !== requestID))
            
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

    const friendReqItems = friendRequests.map((friendReq) => {
        return (
            <li key={friendReq._id}>
                <div className='flex gap-2 items-center'>
                    <Link to={`/profile/${friendReq.requester._id}`} className="flex flex-1 items-center gap-4 truncate p-1">
                        <Avatar src={friendReq.requester.photo} alt="Your requester" />
                        <p className='flex-1 truncate hidden md:block'>{friendReq.requester.username}</p>
                    </Link>
                    <div className='shrink-0'>
                        <button onClick={() => handleClick({ answer: 'Rejected' }, friendReq._id)} className="btn btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-error'><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/></svg></button>
                        <button onClick={() => handleClick({ answer: 'Accepted' }, friendReq._id)} className='btn btn-circle'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-success'><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg></button>
                    </div>
                </div>
            </li>
        )
    })

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex='0' className='btn btn-ghost btn-circle'>
                <div className="w-10 rounded-full flex justify-center align-center">
                    <div className='indicator'>
                        { (requestsNumber > 0) ? <span className="indicator-item badge badge-secondary">{requestsNumber}</span> : null }
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
                    </div>
                </div>
            </label>
            <ul tabIndex='0' className='dropdown-content mt-4 p-2 shadow rounded-box w-44 md:w-64 bg-base-300'>
                { (requestsNumber > 0) ? friendReqItems : (
                    <div className='p-4'>No friend requests</div>
                )}
            </ul>
        </div>
    )
}

export default FriendRequests