import { create } from 'zustand'
import { logout } from '../services/authServices';

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    token: null,
    setAuth: (token) => {
        sessionStorage.setItem('token', token); // Almacena el token en sessionStorage
        set({ isAuthenticated: true, token });
    },
    logout: () => {
        sessionStorage.removeItem('token'); // Elimina el token de sessionStorage
        set({ isAuthenticated: false, token: null });
        logout()
    }
}));

export default useAuthStore