import { useParams } from "react-router-dom"

const RequestTracking = () => {

    const { id } = useParams()

    console.log(id)

    return (
        <div>RequestTracking</div>
    )
}

export default RequestTracking