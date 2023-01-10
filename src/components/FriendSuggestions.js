import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

import { ServerMessageContext } from "../contexts/ServerMessageContext"

import { loadSuggestions } from '../services/UserServices'

import Avatar from "./Avatar"

function FriendSuggestions() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const { setServerErrors, setShowServerErrors } = useContext(ServerMessageContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await loadSuggestions()
                setLoading(false)
                
                setUsers(data.users)
            } catch (error) {
                setServerErrors([error.response.data.error])
                setShowServerErrors(true)
            }
        }

        fetchData()
    }, [setServerErrors, setShowServerErrors])

    const userItems = users.map((user) => {
        return (
            <li key={user._id}>
                <Link to={`/users/${user._id}`} className="w-full flex items-center gap-4 hover:outline hover:outline-secondary rounded-full">
                    <Avatar src={user.photo} alt={user.username} customWidth={'suggestion-pic'}/>
                    <span className="text-2xl">{user.username}</span>
                </Link>
            </li>
        )
    })

    return (
        <>
            <p className="text-2xl font-bold mb-4">People you may know</p>
            <ul className="flex flex-col gap-4">
                { userItems }
                {loading && 
                    <div className="lds-ripple mx-auto">
                        <div>
                            </div><div>
                        </div>
                    </div>
                }
            </ul>
        </>
    )
}

export default FriendSuggestions
