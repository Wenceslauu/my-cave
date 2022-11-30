import { Link } from 'react-router-dom'

function Error() {
    return (
        <div className="pt-40 text-center flex flex-col gap-4">
            <div>
                <p className="text-6xl">Error 404</p>
                <p className="text-2xl">Page not found</p>
            </div>
            <p>You might want to go to go <span className='font-bold underline hover:text-primary'><Link to='/feed'>back</Link></span></p>
        </div>
    )
}

export default Error