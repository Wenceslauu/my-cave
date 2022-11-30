import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import ErrorBox from '../components/ErrorBox'

import { ServerErrorContext } from '../contexts/ServerErrorContext'

function UnprotHeaderLayout() {
    const [serverErrors, setServerErrors] = useState([])
    const [showServerErrors, setShowServerErrors] = useState(false)

    const value = { setServerErrors, setShowServerErrors }

    return (
        <>
            <header>
                <nav className='navbar bg-base-300'>
                    <div className='flex-1'>
                        <Link to='/' className='btn text-primary btn-ghost normal-case text-xl'>MyCave</Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/signup'>Signup</Link></li>
                        </ul>
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

export default UnprotHeaderLayout