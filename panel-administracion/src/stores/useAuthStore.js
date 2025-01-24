import { create } from 'zustand'

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    sessionData: {},
    sessionExpired: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    loginUser: (sessionData) => {
        localStorage.setItem('adminSessionData', JSON.stringify(sessionData))
        set({ isAuthenticated: true, sessionData })
    },
    logoutUser: () => {
        localStorage.removeItem('adminSessionData')
        set({ isAuthenticated: false, sessionData: {}, sessionExpired: false })
    },
    checkAuth: () => {
        const sessionData = localStorage.getItem('adminSessionData')
        set({ isAuthenticated: !!sessionData, sessionData })
    },
    setSessionExpired: (bool) => set({ sessionExpired: bool })
}));

export default useAuthStore