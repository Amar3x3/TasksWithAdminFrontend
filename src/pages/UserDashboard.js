import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('user'));
    setUser(res);
    fetchAssignments(res);
    fetchAdmins(res);
  }, [status]);

  const fetchAssignments = async (res) => {
    
    const response = await axios.get(`http://localhost:5000/api/users/assignments?email=${res.email}&password=${res.password}&status=${status}`);
    setAssignments(response.data);
  };
  // Fetch all admins to show in the dropdown
  const fetchAdmins = async (res) => {
    
    console.log(user)
    const response = await axios.get(`http://localhost:5000/api/users/admins?email=${res.email}&password=${res.password}`);
    setAdmins(response.data);
  };

 


const handleTaskSubmission = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:5000/api/users/upload?email=${user.email}&password=${user.password}`, {
      task: newTask,
      adminId: selectedAdmin
    });
    console.log(response.data);
    // Reset the form after submitting the task
    setNewTask('');
    setSelectedAdmin('');
    fetchAssignments(user);
  } catch (error) {
    console.error('Error submitting task:', error);
  }
};

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-4">
        <button onClick={() => setStatus('')} className="mr-4">All</button>
        <button onClick={() => setStatus('pending')} className="mr-4">Pending</button>
        <button onClick={() => setStatus('accepted')} className="mr-4">Accepted</button>
        <button onClick={() => setStatus('rejected')}>Rejected</button>
      </div>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment._id}>
              <td>{assignment.task}</td>
              <td>{assignment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
        <h1 className="text-3xl font-semibold mb-4">Assignments</h1>

       
        <form onSubmit={handleTaskSubmission} className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Task Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Assign to Admin</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
              required
            >
              <option value="">Select Admin</option>
              {admins.map((admin) => (
                <option key={admin._id} value={admin._id}>
                  {admin.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit Task
          </button>
        </form>

     
    </div>
  );
};

export default UserDashboard;
