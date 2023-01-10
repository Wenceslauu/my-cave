import axios from 'axios'

const api = axios.create({
    baseURL: 'https://mycave-api.onrender.com',
})

export const signup = async (signupData) => {
    const { data } = await api.post('/api/signup', signupData)

    return data 
}

export const login = async (loginData) => {
    const { data } = await api.post('/api/login', loginData)

    return data
}

export const loadOwnUser = async () => {
    const { data } = await api.get('/api/user', {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const loadUsers = async () => {
    const { data } = await api.get('/api/users', {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const loadSuggestions = async () => {
    const { data } = await api.get('/api/users/suggestions', {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const loadAnyProfile = async (userID) => {
    const { data } = await api.get(`/api/users/${userID}`, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const editProfile = async (newPhoto, newBio) => {
    const { data } = await api.put('/api/user', { photo: newPhoto, bio: newBio }, {
        headers: {
            'Authorization': localStorage.getItem('user'),
            'Content-Type': 'multipart/form-data',
        }
    })

    return data
}

export const countUsers = async () => {
    const { data } = await api.get('/api/users/stats')

    return data
}