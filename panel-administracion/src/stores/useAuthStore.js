import { create } from 'zustand'

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    sessionData: {},
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setSessionData: (data) => set({ sessionData: data }),
}));

export default useAuthStore