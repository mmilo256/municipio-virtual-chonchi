const BaseTable = ({ table }) => {

    return (
        <table className="bg-[#fff] w-full rounded overflow-hidden shadow">
            <thead>
                <tr className="text-left bg-primary text-white text-sm">
                    {table.columns.map((col, index) => (
                        <th key={index} className="p-2">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {table.data.map((row, index) => (
                    <tr key={index} className="even:bg-sky-50 odd:bg-[#fff]">
                        {Object.values(row).map((cell, index) => (
                            <td key={index} className="p-2 text-sm">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BaseTable