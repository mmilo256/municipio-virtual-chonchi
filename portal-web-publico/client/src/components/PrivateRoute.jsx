import { Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
const PrivateRoute = ({ children }) => {

    const user = sessionStorage.getItem('session')

    if (!user) {
        return <Navigate to="/" />
    }

    return <Layout>{children}</Layout>

}

export default PrivateRoute