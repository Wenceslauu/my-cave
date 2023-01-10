import axios from 'axios'

const api = axios.create({
    baseURL: 'https://mycave-api.onrender.com',
})

export const loadPosts = async (page, offset) => {
    const { data } = await api.get(`/api/posts?page=${page}&offset=${offset}`, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const toggleLike = async (postID) => {
    const { data } = await api.put(`/api/posts/${postID}/toggle-like`, {}, {
        headers: {
            'Authorization': localStorage.getItem('user'),
            'Content-Length': 0
        }
    })

    return data
}

export const writePost = async (postBody) => {
    const { data } = await api.post('/api/posts', postBody, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const deletePost = async (postID) => {
    const { data } = await api.delete(`/api/posts/${postID}`, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const countPosts = async () => {
    const { data } = await api.get('/api/posts/stats')

    return data
}
