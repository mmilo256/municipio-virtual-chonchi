const BaseTable = ({ table }) => {

    return (
        <table className="bg-[#fff] w-full rounded overflow-hidden shadow text-xs md:text-sm">
            <thead>
                <tr className="text-left bg-primary text-white">
                    {table.columns.map((col, index) => (
                        <th key={index} className="p-2">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {table.data.map((row, index) => (
                    <tr key={index} className="even:bg-sky-50 odd:bg-[#fff]">
                        {Object.values(row).map((cell, index) => (
                            <td key={index} className="p-2">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BaseTable