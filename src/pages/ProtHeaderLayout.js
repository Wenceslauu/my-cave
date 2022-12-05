import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { ServerErrorContext } from '../contexts/ServerErrorContext'

import ErrorBox from '../components/ErrorBox'
import FriendRequests from '../components/FriendRequests'
import Avatar from '../components/Avatar'
import { loadOwnUser } from '../services/UserServices'

function ProtHeaderLayout() {
    const [user, setUser] = useState({})
    const [serverErrors, setServerErrors] = useState([])
    const [showServerErrors, setShowServerErrors] = useState(false)

    const value = { setServerErrors, setShowServerErrors }

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadOwnUser()

                console.log(data.user)
                setUser(data.user)
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

    function logout() {
        localStorage.removeItem('user')
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
                        <ServerErrorContext.Provider value={value}>
                            <FriendRequests />
                        </ServerErrorContext.Provider>
                        <div className="dropdown dropdown-end">
                            {/* A <label tabindex="0"> is used here instead of a <button> because Safari has
                                a bug that prevents the button from being focused. */}
                            <label tabIndex='0' className='btn btn-ghost btn-circle'>
                                <Avatar src={user.photo} alt="You" />
                            </label>
                            <ul tabIndex='0' className='menu menu-compact dropdown-content mt-4 p-2 shadow rounded-box w-52 bg-base-300'>
                                <li className='font-bold py-2 px-4'>{user.username}</li>
                                <li><Link to='profile'>Profile</Link></li>
                                <li><button onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className='flex-1 py-8'>
                <ServerErrorContext.Provider value={value}>
                    <Outlet />
                </ServerErrorContext.Provider>
                <ErrorBox errors={serverErrors} show={showServerErrors} closeWarning={() => setShowServerErrors(false)} />
            </main>
        </>
    )
}

export default ProtHeaderLayout