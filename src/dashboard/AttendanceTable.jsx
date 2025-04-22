import React from 'react';

const employees = [
  {
    id: 1,
    name: 'Ronny Asmo',
    role: 'Software Engineer',
    salary: '3,200 NOK',
    status: 'Test Period',
    type: 'Full time',
    duration: '2 months',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: 2,
    name: 'Tomas Lensersteig',
    role: 'Business Analyst',
    salary: '4,000 NOK',
    status: 'Test Period',
    type: 'Full time',
    duration: '1.5 months',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  {
    id: 3,
    name: 'Kathrine Lensersteig',
    role: 'Project Manager',
    salary: '2,800 NOK',
    status: 'Test Period',
    type: 'Full time',
    duration: '2 months',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: 4,
    name: 'Arne Opheim',
    role: 'Research Engineer',
    salary: '1,600 NOK',
    status: 'Worker',
    type: 'Full time',
    duration: '1 year',
    avatar: 'https://i.pravatar.cc/40?img=4',
  },
  {
    id: 5,
    name: 'Ingrid Oline',
    role: 'Software Engineer',
    salary: '5,000 NOK',
    status: 'Worker',
    type: 'Full time',
    duration: '2 years',
    avatar: 'https://i.pravatar.cc/40?img=5',
  },
];

const AttendanceTable = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employees</h2>
        <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          Add Employee
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-left text-gray-600 text-sm uppercase tracking-wider">
            <th><input type="checkbox" /></th>
            <th>Employee</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="p-4"><input type="checkbox" /></td>
              <td className="flex items-center gap-3 p-4">
                <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium text-gray-900">{emp.name}</div>
                  <div className="text-sm text-gray-500">{emp.role}</div>
                </div>
              </td>
              <td className="p-4">
                <div>{emp.salary}</div>
                <div className="text-sm text-gray-500">{emp.type}</div>
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    emp.status === 'Worker'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {emp.status.toLowerCase()}
                </span>
                <div className="text-sm text-gray-500">{emp.duration}</div>
              </td>
              <td className="p-4 flex gap-3 text-gray-500">
                <button className="hover:text-blue-500">
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="hover:text-red-500">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
