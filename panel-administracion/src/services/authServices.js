import apiClient from './apiClient'

export const login = async (username, password) => {
    const response = await apiClient.post(`/admin/auth/login`, { username, password })
    console.log(response.data.payload)
    return response.data
}

export const logout = async () => {
    const response = await apiClient.post(`/admin/auth/logout`, null)
    return response.data
}