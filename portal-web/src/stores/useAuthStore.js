import { create } from 'zustand'
import { fetchSessionData, logout } from '../services/authServices';

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    sessionData: {},
    sessionExpired: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    logoutUser: async () => {
        try {
            await logout()
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            set({ isAuthenticated: false, sessionData: {}, sessionExpired: false })
        }
    },
    checkAuth: async () => {
        try {
            const userData = await fetchSessionData()
            if (userData) {
                if (Object.values(userData).length === 0) {
                    set({ isAuthenticated: false, sessionData: {} })
                } else {
                    set({ isAuthenticated: true, sessionData: userData })
                }
            }
        } catch (error) {
            throw error.message
        }
    },
    setSessionExpired: (bool) => set({ sessionExpired: bool })
}));

export default useAuthStore