import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import UserDashboard from './pages/UserDashboard.js';
import AdminDashboard from './pages/AdminDashboard.js';
import Home from './pages/Home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path="/users/login" element={<Login role="users" />} />
        <Route path="/admins/login" element={<Login role="admins" />} />
        <Route path="/users/register" element={<Register role="users" />} />
        <Route path="/admins/register" element={<Register role="admins" />} />
        <Route path="/users/dashboard" element={<UserDashboard />} />
        <Route path="/admins/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
