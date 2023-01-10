import { useState, useEffect, useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts/UserContext'
import { ServerMessageContext } from '../contexts/ServerMessageContext'

import { loadOwnUser } from '../services/UserServices'

import FriendRequests from './FriendRequests'
import Avatar from './Avatar'

function ProtHeaderLayout() {
    const [user, setUser] = useState({})

    const userValue = user

    const { setServerErrors, setShowServerErrors, setServerSuccesses, setShowServerSuccesses } = useContext(ServerMessageContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadOwnUser()

                setUser(data.user)
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
    }, [navigate, setServerErrors, setShowServerErrors])

    function logout() {
        localStorage.removeItem('user')

        setServerSuccesses(["Logout successful"])
        setShowServerSuccesses(true)

        navigate('/login')
    }

    return (
        <>
            <header>
                <nav className='navbar bg-base-300'>
                    <div className='flex-1'>
                        <Link to='/feed' className='btn text-primary btn-ghost normal-case text-xl'>MyCave</Link>
                    </div>
                    <div className="flex-none flex gap-6">
                        <Link to='/users' >
                            <div className='btn btn-ghost btn-circle'>
                                <div className='w-10 rounded-full flex justify-center align-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z"/></svg>
                                </div>
                            </div>
                        </Link>
                        <FriendRequests />
                        <div className="dropdown dropdown-end">
                            {/* A <label tabindex="0"> is used here instead of a <button> because Safari has
                                a bug that prevents the button from being focused. */}
                            <label tabIndex='0' className='btn btn-ghost btn-circle'>
                                <Avatar src={user.photo} alt="You" customWidth='avatar-pic' />
                            </label>
                            <ul tabIndex='0' className='menu menu-compact dropdown-content mt-4 p-2 shadow rounded-box w-52 bg-base-300'>
                                <li className='font-bold py-2 px-4'>{user.username}</li>
                                <li><Link to={`/users/${user._id}`}>Profile</Link></li>
                                <li><button onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className='flex-1 py-8'>
                <UserContext.Provider value={userValue}>
                    <Outlet />
                </UserContext.Provider>
            </main>
        </>
    )
}

export default ProtHeaderLayout