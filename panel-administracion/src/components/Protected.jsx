import useAuthStore from "../stores/useAuthStore"
import { Navigate } from "react-router-dom"

const Protected = ({ children }) => {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children
}

export default Protected