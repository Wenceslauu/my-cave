import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080',
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