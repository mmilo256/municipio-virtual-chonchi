import BaseTable from "../../ui/BaseTable"

const Solicitudes = ({ requests, title }) => {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <BaseTable table={requests} />
        </div>
    )
}

export default Solicitudes