import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ServerMessageContext } from '../contexts/ServerMessageContext'

import { loadAnyProfile } from '../services/UserServices'

import { UserContext } from '../contexts/UserContext'

import { editProfile } from '../services/UserServices'
import { sendFriendReq } from '../services/FriendReqServices'

import Avatar from '../components/Avatar'
import UserCard from '../components/UserCard'
import Post from '../components/Post'
import Input from '../components/Input'

function Profile() {
    const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])
    const [isFriend, setIsFriend] = useState(true)
    const [posts, setPosts] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [newBio, setNewBio] = useState('')
    const [newPhoto, setNewPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const ownUser = useContext(UserContext)
    
    const { userID } = useParams()

    const { setServerErrors, setShowServerErrors, setServerSuccesses, setShowServerSuccesses } = useContext(ServerMessageContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await loadAnyProfile(userID)
                setLoading(false)

                setUser(data.user)
                setFriends(data.friends)
                setPosts(data.posts)

                setNewBio(data.user.bio)

                if (data.friends.filter((friend) => {
                    if (friend._id === ownUser._id)
                        return true

                    return false
                }).length !== 0)
                    setIsFriend(true)
                else
                    setIsFriend(false)
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
    }, [navigate, setServerErrors, setShowServerErrors, userID, ownUser])

    useEffect(() => {
        const moreFriendsModal = document.getElementById('more-friends')

        moreFriendsModal.checked = false
    })

    const handleBioChange = (e) => {
        const target = e.target

        setNewBio(target.value)
    }

    const handlePhotoChange = (e) => {
        const target = e.target

        if (target.files)
            setNewPhoto(target.files[0])
    }

    const handleSend = async () => {
        try {
            const data = await sendFriendReq(userID)

            setServerSuccesses([data.success])
            setShowServerSuccesses(true)
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

    const handleSubmit = async () => {
        try {
            const data = await editProfile(newPhoto, newBio)

            setUser((prevUser) => {
                return {
                    ...prevUser,
                    bio: newBio,
                    photo: (data.url) ? data.url : user.photo 
                }
            })
            
            setEditMode(false)

            setServerSuccesses([data.success])
            setShowServerSuccesses(true)
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

    const friendItems = friends.map((friend) => {
        return (
            <UserCard key={friend._id} user={friend} />
        )
    })

    const postItems = posts.map((post) => {
        return (
            <Post key={post._id} post={post} actions={false} newUserPic={user.photo} />
        )
    })

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-6 mx-0 sm:mx-8 md:mx-40'>
                <div className='lg:col-span-2 flex flex-col items-center lg:flex-row lg:items-start gap-8 bg-base-300 rounded-box p-6 relative'>
                    <Avatar src={user.photo} alt={user.name} customWidth='profile-pic' />
                    <div className={`flex flex-col items-center lg:items-start gap-2 text-center lg:text-left w-full ${(loading) ? 'h-full' : '' }`}>
                        {(loading) ?
                            <div className="lds-ripple mx-auto my-auto">
                                <div>
                                    </div><div>
                                </div>
                            </div>
                            :   <div className='flex flex-col items-center lg:items-start gap-2 text-center lg:text-left w-full'>
                                    <p className='text-4xl lg:text-3xl xl:text-5xl font-bold flex flex-col xl:flex-row items-center gap-2'>
                                        <div className='flex items-center'>
                                            {user.username}
                                            <span className='font-thin'>, {user.age}</span>
                                        </div>
                                        {(user.isBot) && <span className="badge badge-lg badge-secondary">BOT</span>}
                                    </p>
                                    <p className='italic text-xl'>{user.name}</p>
                                </div>
                        }
                        {(editMode) ? 
                            <Input
                                isTextArea={true}
                                field='bio'
                                value={newBio}
                                onChange={handleBioChange}
                            />
                        :   <p className='whitespace-normal break-words [hyphens:auto]'>
                                {(loading) ? '' : (user.bio) ? ('Bio: ' + user.bio) : 'No bio'}
                            </p>
                        }
                        {(ownUser._id === userID) ?
                            <div className='w-full mb-[-5px]'>
                                {(editMode) ? 
                                    <div className='flex flex-col xl:flex-row items-center justify-between gap-4'>
                                        <input type="file" accept='.png,.jpg,.jpeg' onChange={handlePhotoChange} className="file-input file-input-bordered file-input-primary max-w-xs" />
                                        <div className='flex items-center gap-2'>
                                            <button onClick={handleSubmit} className='btn btn-secondary'>Submit</button>
                                            <button onClick={() => {
                                                setEditMode((prevBioEditMode) => !prevBioEditMode)
                                                setNewBio(user.bio)
                                                }} className='btn'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-secondary'><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                    :   <button onClick={() => {
                                            setEditMode((prevBioEditMode) => !prevBioEditMode)
                                            setNewBio(user.bio)
                                            }} className='btn lg:absolute lg:bottom-[23px] lg:right-6'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-secondary'><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                        </button>
                                }
                            </div>
                            : (!isFriend) ? 
                                <button onClick={handleSend} className='btn btn-success lg:absolute lg:bottom-4 lg:right-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                                </button>
                             : null
                        }
                    </div>
                </div>
                <div className='bg-base-300 rounded-box p-6 flex flex-col justify-center'>
                    <div className='w-full flex justify-between items-center mb-4'>
                        <span className='text-xl font-bold'>Friends ({friends.length})</span>
                        {(friends.length > 2) ? 
                        <label htmlFor='more-friends' className='btn btn-xs'>
                            <span className='text-secondary'>More friends</span>
                        </label>
                        : null}
                    </div>
                    {(loading) ? 
                        <div className="lds-ripple mx-auto">
                            <div>
                                </div><div>
                            </div>
                        </div>
                        :   <ul className={`flex gap-4 ${(friendItems.length === 1) ? 'w-[calc(50%-0.5rem)]' : 'w-full'}`}>
                                {friendItems.slice(0, 2)}
                            </ul>
                    }
                </div>
                <div className='bg-base-300 rounded-box p-6 flex flex-col justify-center'>
                    <div className='w-full flex justify-between items-center mb-4'>
                        <span className='text-xl font-bold'>Posts ({posts.length})</span>
                        {(posts.length > 2) ?
                        <label htmlFor='more-posts' className='btn btn-xs'>
                            <span className='text-secondary'>More posts</span>
                        </label>
                        : null}
                    </div>
                    {(loading) ? 
                        <div className="lds-ripple mx-auto">
                            <div>
                                </div><div>
                            </div>
                        </div>
                        :   <ul className='flex flex-col gap-4'>
                                {postItems.slice(0, 2)}
                            </ul> 
                    }
                </div>
            </div>
            <div>
                <input type="checkbox" id="more-friends" className="modal-toggle" />
                <label htmlFor="more-friends" className="modal cursor-pointer modal-bottom sm:modal-middle">
                  <label className="modal-box relative" htmlFor="">
                    <p className='text-3xl font-bold pl-4 pb-4'>All Friends</p>
                    <ul className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
                        {friendItems}
                    </ul>
                  </label>
                </label>
            </div>
            <div>
                <input type="checkbox" id="more-posts" className="modal-toggle" />
                <label htmlFor="more-posts" className="modal cursor-pointer modal-bottom sm:modal-middle">
                  <label className="modal-box relative" htmlFor="">
                    <p className='text-3xl font-bold pl-4 pb-4'>All Posts</p>
                    <ul className='flex flex-col gap-4'>
                        {postItems}
                    </ul>
                  </label>
                </label>
            </div>
        </div>
    )
}

export default Profile