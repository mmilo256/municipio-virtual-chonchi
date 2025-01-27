import { create } from 'zustand'

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    sessionData: {},
    sessionExpired: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    loginUser: (token) => {
        localStorage.setItem('publicAccessToken', JSON.stringify(token))
        set({ isAuthenticated: true, sessionData: token })
    },
    logoutUser: () => {
        localStorage.removeItem('publicAccessToken')
        set({ isAuthenticated: false, sessionData: {}, sessionExpired: false })
    },
    checkAuth: () => {
        const token = JSON.parse(localStorage.getItem('publicAccessToken'))
        if (token) {
            if (Object.values(token).length === 0) {
                set({ isAuthenticated: false, sessionData: {} })
            } else {
                set({ isAuthenticated: true, sessionData: token })
            }
        }
    },
    setSessionExpired: (bool) => set({ sessionExpired: bool })
}));

export default useAuthStore