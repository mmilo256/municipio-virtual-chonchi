import apiClient from './apiClient'

export const login = async (username, password) => {
    const response = await apiClient.post(`/auth/login`, { username, password })
    return response.data
}

export const logout = async () => {
    const response = await apiClient.post(`/auth/logout`, null)
    return response.data
}

export const verifySession = async () => {
    const response = await apiClient.get("/auth/session")
    return response.data
}