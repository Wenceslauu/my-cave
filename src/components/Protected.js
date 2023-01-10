import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { ServerMessageContext } from '../contexts/ServerMessageContext'

function Protected({ children }) {
    const token = localStorage.getItem('user')

    const { setServerErrors, setShowServerErrors } = useContext(ServerMessageContext)

    if (!token) {
        setShowServerErrors(true)
        setServerErrors(['Unauthorized'])

        return <Navigate to='/login' />
    }

    return children
}

export default Protected