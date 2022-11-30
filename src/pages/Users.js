import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { loadUsers } from "../services/UserServices"

import { ServerErrorContext } from "../contexts/ServerErrorContext"

function Users() {
    const { setServerErrors, setShowServerErrors } = useContext(ServerErrorContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadUsers()
                
                console.log(data)
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

    return (
        <>
            <div>
                users 
            </div>
        </>
    )
}

export default Users