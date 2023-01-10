import { Link, Outlet } from 'react-router-dom'

function UnprotHeaderLayout() {
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
                            <li><Link to='/signup'>Sign up</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className='flex-1 py-8'>
                <Outlet />
            </main>
        </>
    )
}

export default UnprotHeaderLayout