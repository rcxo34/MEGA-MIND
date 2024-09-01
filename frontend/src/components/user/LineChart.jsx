import { jwtDecode } from 'jwt-decode';
import { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import AuthContext  from '../../context/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {

  const { getToken } = useContext(AuthContext);
  const [completedDays, setCompletedDays] = useState([]); //Array
  const [responseData, setResponseData] = useState([]) // Object for storing the response data from fetchCompletedDays
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

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
        // console.log(data.totalDays)
        const daysArray = data.totalDays.map(obj => obj.day);
        // const valuesArray = data.totalDays.map(obj => obj.timeCompleted);
        // console.log(daysArray)
        // console.log(valuesArray)
        // const labels = data.map((item) => `Day ${item.day}`);
        // const values = data.map((item) => item.value);


        const hours = data.totalDays.map(item => {
          const date = new Date(item.timeCompleted);
          return date.getHours(); // or date.getHours() for local hour
        });
        // console.log(hours)
        
        setChartData({
          labels: daysArray,
          datasets: [
            {
              label: 'My Dataset',
              data: hours,
              fill: false,
              backgroundColor: '252525',
              borderColor: '#191919',
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false); 
      }
    };

    fetchCompletedDays();
  }, [getToken]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart Example',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2, // Set the interval between ticks to 2
          max: 24, // Set the maximum value of the y-axis
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;