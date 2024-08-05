import React from 'react';
import '../../styles/user/sidebar.css'; 
import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  // const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      const data = await response.json();
      setMessage(data.message);
      setError('');
    } catch (error) {
      console.error('Error updating password:', error);
      setError(error.message || 'Failed to update password');
      setMessage('');
    }
  };


  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleSidebar} className="close-button">X</button>
      
      <div className="update-password-container">
      <h2>Update Password</h2>
      
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="update-password-input"
      />
      <button onClick={handleUpdatePassword} className="update-password-button">
        Update Password
      </button>
      {message && <div className="update-password-message">{message}</div>}
      {error && <div className="update-password-error">{error}</div>}
    </div>



    </div>
  );
};

export default Sidebar;
