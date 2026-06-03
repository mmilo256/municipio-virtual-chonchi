const BaseTable = ({ data = [], columns = [] }) => {
  return (
    <div className="border rounded border-slate-300">
      <table className="w-full overflow-hidden rounded min-w-[50rem]">
        <thead>
          <tr className="text-left bg-primary text-white text-sm">
            {columns?.map((col, index) => (
              <th key={index} className="p-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index} className="even:bg-sky-50 hover:bg-orange-50 odd:bg-[#fff]">
              {Object.values(row)?.map((cell, index) => (
                <td key={index} className="px-2 py-1.5 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaseTable;
