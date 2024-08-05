import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext  from '../../context/AuthContext';
import '../../styles/user/dashboard.css';
import { FaStar } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';

const StatusTable = () => {
  const { getToken } = useContext(AuthContext);
  const [completedDays, setCompletedDays] = useState([]); //Array
  const [responseData, setResponseData] = useState([]) // Object for storing the response data from fetchCompletedDays
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedDays = async () => {
      try {
        const token = getToken();
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await fetch(`http://localhost:8080/users/${userId}/completedDaysList`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch completed days');
        }

        const data = await response.json();
        const daysArray = data.totalDays.map(obj => obj.day);
        setResponseData(data.totalDays)
        setCompletedDays(daysArray);
        console.log(completedDays)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false); 
      }
    };

    fetchCompletedDays();
  }, [getToken]); // Ensure getToken is in dependency array if needed

  const generateDaysStatus = (completedDays) => {
    return Array.from({ length: 30 }, (v, i) => ({
      day: i + 1,
      status: completedDays.includes(i + 1) ? 'Completed' : 'Pending',
      score: responseData.find(day => day.day === i + 1)?.score || 0
    }));
  };

  const daysStatus = generateDaysStatus(completedDays);

  return (
    <div>
      {loading ? (
        <>
            <h2>Status for 30 Days</h2>
            <p>Loading...</p>
        </>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="status-table">
      
      <table>
        <thead>
          <tr>
            <th className='bg-blue-400 '>Day</th>
            <th className='bg-blue-400 '>Status</th>
            <th className='bg-blue-400 '>Score</th>
          </tr>
        </thead>
        <tbody>
          {daysStatus.map((dayStatus) => (
            <tr key={dayStatus.day} className={dayStatus.status === 'Completed' ? 'bg-blue-200 text-blue-900' : ' '}>
              <td>{dayStatus.day}</td>
              <td>{dayStatus.status}</td>
              <td className='flex justify-center'>
                {dayStatus.status === 'Completed' ? dayStatus.score : <FaCircleXmark style={{}}/>}
                {dayStatus.score === 3 && <FaStar style={{display:'inline',color: '#d97706', fontSize: '20', marginBottom:'4px'}}/> }  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}
    </div>
  );
};

export default StatusTable;
