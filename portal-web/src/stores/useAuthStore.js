import { create } from 'zustand'

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    token: null,
    sessionExpired: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    loginUser: (token) => {
        localStorage.setItem('publicAccessToken', token)
        set({ isAuthenticated: true, token })
    },
    logoutUser: () => {
        localStorage.removeItem('publicAccessToken')
        set({ isAuthenticated: false, token: null, sessionExpired: false })
    },
    checkAuth: () => {
        const token = localStorage.getItem('publicAccessToken')
        set({ isAuthenticated: !!token, token })
    },
    setSessionExpired: (bool) => set({ sessionExpired: bool })
}));

export default useAuthStore