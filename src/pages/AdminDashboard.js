import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Fetch assignments tagged to the logged-in admin
    const fetchAssignments = async () => {
        const admin = JSON.parse(localStorage.getItem('admin'));
      const response = await axios.get(`http://localhost:5000/api/admins/assignments?email=${admin.email}&password=${admin.password}&status=${status}`);
      console.log(response.data);
      setAssignments(response.data);
    };
    
    fetchAssignments();
  }, []);

  const handleAccept = (id) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    axios.post(`http://localhost:5000/api/admins/assignments/${id}/accept?email=${admin.email}&password=${admin.password}`)
      .then(response => {
        console.log('Assignment Accepted:', response.data);
        setAssignments(assignments.map(task => task._id === id ? { ...task, status: 'Accepted' } : task));
      });
  };

  const handleReject = (id) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    axios.post(`http://localhost:5000/api/admins/assignments/${id}/reject?email=${admin.email}&password=${admin.password}`)
      .then(response => {
        console.log('Assignment Rejected:', response.data);
        setAssignments(assignments.map(task => task._id === id ? { ...task, status: 'Rejected' } : task));
      });
  };

  return (
    <div className="flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-4">Assignments</h1>
       
        {/* Assignments Table */}
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments == null ? assignments.map((assignment) => (
              <tr key={assignment._id} className="border-t">
                <td className="px-4 py-2">{assignment.task}</td>
                <td className="px-4 py-2">{assignment.status}</td>
                <td className="px-4 py-2">
                  <button 
                    className="bg-green-500 text-white py-1 px-2 mr-2" 
                    onClick={() => handleAccept(assignment._id)}>Accept</button>
                  <button 
                    className="bg-red-500 text-white py-1 px-2"
                    onClick={() => handleReject(assignment._id)}>Reject</button>
                </td>
              </tr>
            )):<h1 className="text-3xl font-semibold mb-4">No Task Assigned</h1>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
