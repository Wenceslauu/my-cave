import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ServerMessageContext } from "../contexts/ServerMessageContext"

import { UserContext } from "../contexts/UserContext"

import { loadUsers } from "../services/UserServices"

import UserCard from '../components/UserCard'
import Input from "../components/Input"

function Users() {
    const ownUser = useContext(UserContext)

    const [users, setUsers] = useState([])
    const [userSearch, setUserSearch] = useState('')
    const [friendsOnly, setFriendsOnly] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const { setServerErrors, setShowServerErrors } = useContext(ServerMessageContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await loadUsers()
                setLoading(false)
                
                setUsers(data.users)
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

    const handleChange = (e) => {
        const target = e.target
        setUserSearch(target.value)
    }

    const handleToggle = () => {
        setFriendsOnly((prevFriendOnly) => !prevFriendOnly)
    }

    const regexUsername = new RegExp(`^${userSearch}`, 'i')
    const userItems = users.filter((user) => {
        if (regexUsername.test(user.username)) {
            if (friendsOnly && ownUser.friends.includes(user._id))
                return true
            else if (!friendsOnly)
                return true
        }

        return false
    }).map((user) => {
        return (
            <UserCard key={user._id} user={user} />
        )
    })

    return (
        <div className="flex flex-col gap-4 px-4 sm:px-8 md:px-40">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <Input
                        type='text'
                        field='text'
                        placeholder="Search for any user!"
                        value={userSearch}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center flex-none">
                    <label htmlFor="friends-only">Only Friends</label>
                    <input id="friends-only" type="checkbox" className="toggle toggle-primary toggle-lg" checked={friendsOnly} onChange={handleToggle} />
                </div>
            </div>
            {loading ||
                <p className="text-lg">{(userItems.length !== 0) ? userItems.length : 'No'} {(userItems.length !== 1) ? 'Results' : 'Result' }</p>
            }
            <ul className="grid place-content-center [grid-template-columns:repeat(auto-fit,minmax(200px,0.7fr))]
            lg:[grid-template-columns:repeat(auto-fit,minmax(200px,0.3fr))] gap-4 gap-y-8">
                {userItems}
            </ul>
            {loading && 
                <div className="lds-ripple mx-auto">
                    <div>
                        </div><div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Users