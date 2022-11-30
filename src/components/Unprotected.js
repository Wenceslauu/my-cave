import { Navigate } from "react-router-dom";

function Unprotected({ children }) {
    const token = localStorage.getItem('user')

    if (token) {
        return <Navigate to='/feed' />
    }

    return children
}

export default Unprotected