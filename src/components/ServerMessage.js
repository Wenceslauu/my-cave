import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { ServerMessageContext } from '../contexts/ServerMessageContext'

import ErrorBox from './ErrorBox'
import SuccessBox from './SuccessBox'

function ServerMessage() {
    const [serverErrors, setServerErrors] = useState([])
    const [serverSuccesses, setServerSuccesses] = useState([])
    const [showServerErrors, setShowServerErrors] = useState(false)
    const [showServerSuccesses, setShowServerSuccesses] = useState(false)

    const value = { setServerErrors, setShowServerErrors, setServerSuccesses, setShowServerSuccesses }

    return (
        <>
            <ServerMessageContext.Provider value={value}>
                <Outlet />
            </ServerMessageContext.Provider>
            <ErrorBox errors={serverErrors} show={showServerErrors} closeWarning={() => setShowServerErrors(false)} />
            <SuccessBox successes={serverSuccesses} show={showServerSuccesses} closeWarning={() => setShowServerSuccesses(false)} />
        </>
    )
}

export default ServerMessage