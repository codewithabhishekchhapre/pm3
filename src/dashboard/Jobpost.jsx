import React from 'react'

function Jobpost() {

     const Card = ({ title, text }) => (
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{text}</p>
          </div>
        );
  return (
    <div>
     <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to the HR Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Use the sidebar to manage your HR tasks efficiently. This includes
          job postings, application reviews, performance tracking, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Job Postings" text="Create and manage job listings." />
          <Card title="Applications" text="Review and shortlist candidates." />
          <Card title="Attendance" text="Track employee attendance easily." />
          <Card title="Leave Management" text="Manage employee leaves." />
          <Card title="Performance" text="Evaluate employee performance." />
          <Card title="Announcements" text="Post company-wide updates." />
        </div>
      </main>
    </div>
  )
}

export default Jobpost