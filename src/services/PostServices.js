import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080',
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
