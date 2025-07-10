import Layout from "./layouts/Layout"
import useAuthStore from "../stores/useAuthStore"
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    const { isAuthenticated } = useAuthStore(state => state)

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Layout>{children}</Layout>

}

export default PrivateRoute