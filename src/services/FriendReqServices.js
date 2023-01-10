import axios from 'axios'

const api = axios.create({
    baseURL: 'https://mycave-api.onrender.com',
})

export const loadFriendReqs = async () => {
    const { data } = await api.get('/api/user/friend-requests', {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const answerFriendReq = async (answerBody, requestID) => {
    const { data } = await api.put(`/api/user/friend-requests/${requestID}`, answerBody, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const sendFriendReq = async (userID) => {
    const { data } = await api.post(`/api/users/${userID}/friend-requests`, {}, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}