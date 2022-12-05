import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080',
})

export const loadComments = async (postID) => {
    const { data } = await api.get(`/api/posts/${postID}/comments`, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const writeComment = async (commentBody, postID) => {
    const { data } = await api.post(`/api/posts/${postID}/comments`, commentBody, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}