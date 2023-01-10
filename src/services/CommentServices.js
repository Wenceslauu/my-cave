import axios from 'axios'

const api = axios.create({
    baseURL: 'https://mycave-api.onrender.com',
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

export const deleteComment = async (postID, commentID) => {
    const { data } = await api.delete(`/api/posts/${postID}/comments/${commentID}`, {
        headers: {
            'Authorization': localStorage.getItem('user')
        }
    })

    return data
}

export const countComments = async () => {
    const { data } = await api.get('/api/comments/stats')

    return data
}

