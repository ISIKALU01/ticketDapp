// components/DataSpreadsheet.js
export default function DataSpreadsheet() {
  const data = [
    { id: 1, name: 'Project A', status: 'Active', progress: '75%' },
    { id: 2, name: 'Project B', status: 'Pending', progress: '10%' },
    { id: 3, name: 'Project C', status: 'Completed', progress: '100%' },
  ];

  return (
    <div className="spreadsheet">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Progress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded ${
                  item.status === 'Active' ? 'bg-green-100 text-green-800' :
                  item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="p-2">{item.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}