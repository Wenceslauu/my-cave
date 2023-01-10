import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { ServerMessageContext } from '../contexts/ServerMessageContext'

import { countUsers } from '../services/UserServices'
import { countPosts } from '../services/PostServices'
import { countComments } from '../services/CommentServices'

function Home() {
    const [usersNumber, setUsersNumber] = useState(0)
    const [postsNumber, setPostsNumber] = useState(0)
    const [commentsNumber, setCommentsNumber] = useState(0)

    const { setServerErrors, setShowServerErrors } = useContext(ServerMessageContext)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await countUsers()
                
                setUsersNumber(data.count)
            } catch (error) {
                setServerErrors([error.response.data.error])
                setShowServerErrors(true)
            }
        }

        fetchData()
    }, [setServerErrors, setShowServerErrors])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await countPosts()
                
                setPostsNumber(data.count)
            } catch (error) {
                setServerErrors([error.response.data.error])
                setShowServerErrors(true)
            }
        }

        fetchData()
    }, [setServerErrors, setShowServerErrors])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await countComments()
                
                setCommentsNumber(data.count)
            } catch (error) {
                setServerErrors([error.response.data.error])
                setShowServerErrors(true)
            }
        }

        fetchData()
    }, [setServerErrors, setShowServerErrors])

    return (
        <div className="flex flex-col gap-4 px-0 sm:px-8 md:px-40">
            <div className="hero shadow rounded-box bg-base-200">
                <div className="hero-content text-center">
                    <div className="flex flex-col items-center max-w-md">
                        <h1 className="text-5xl font-bold">Get Started</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium molestiae facere perspiciatis magnam repellat numquam consequuntur.</p>
                        <div className='flex gap-4'>
                            <Link className='btn btn-primary' to='/login'>Login</Link>
                            <Link className='btn btn-primary' to='/signup'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stats shadow bg-base-200 stats-vertical lg:stats-horizontal lg:absolute lg:bottom-20 lg:left-40 lg:right-40">  
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current fill-current"><path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z"/></svg>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">{usersNumber}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current fill-current"><path d="M10 13h-4v-1h4v1zm2.318-4.288l3.301 3.299-4.369.989 1.068-4.288zm11.682-5.062l-7.268 7.353-3.401-3.402 7.267-7.352 3.402 3.401zm-6 8.916v.977c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-20h14.056l1.977-2h-18.033v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.843l-2 2.023z"/></svg>
                    </div>
                    <div className="stat-title">Total Posts</div>
                    <div className="stat-value text-secondary">{postsNumber}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-10 h-10 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Total Comments</div>
                    <div className="stat-value text-accent">{commentsNumber}</div>
                </div>
            </div>
        </div>
    )
}

export default Home