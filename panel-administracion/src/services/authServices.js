import apiClient from './apiClient'

export const login = async (username, password) => {
    try {
        const response = await apiClient.post(`/admin/auth/login`, { username, password })
        const data = response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export const logout = async () => {
    try {
        await apiClient.post(`/admin/auth/logout`, null)
    } catch (error) {
        return error.response.data
    }
}