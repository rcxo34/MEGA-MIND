import { jwtDecode } from 'jwt-decode';
import '../../styles/user/dashboard.css';
import AuthContext from '../../context/AuthContext';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import StatusTable from './StatusTable';
import { toast } from 'react-toastify';
import { useState, useContext, useEffect } from 'react';
import { FaCalendarDays, FaCircleUser, FaDoorOpen, FaStar, FaUser, FaBell } from 'react-icons/fa6';
import { FaBars, FaCaretRight, FaPowerOff } from 'react-icons/fa';
import SideButtons from './SideButtons';
import UserSideBar from './UserSidebar'


const UserContent = () => {
    const [days, setDays] = useState();
    const [score, setScore] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('user');
    const { getToken } = useContext(AuthContext);
    const [completedDays, setCompletedDays] = useState([]);

    // useEffect(()=> {
    //   toast.success('Welcome!')
    // },[])

  

    const fetchDays = async () => { /* Also fetches username */
        try{

            const token = getToken();
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            const username = decodedToken.name; // This line fetches username
            
          
            const response1 = await fetch(`http://localhost:8080/users/${userId}/day`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            const response2 = await fetch(`http://localhost:8080/users/${userId}/score`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            
            const response3 = await fetch(`http://localhost:8080/users/${userId}/completedDaysList`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
    
            if (!response3.ok) {
              throw new Error('Failed to fetch completed days');
            }
    
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();

            setDays(data1.day);
            setScore(data2.score);

            setUsername(username);
            const daysArray = data3.totalDays.map(obj => obj.day);
            setCompletedDays(daysArray);

            
        } catch(error) {
                setError(error.message);
              } finally {
                setLoading(false);
        }
      }

    useEffect(() => {
    fetchDays();
      }, []);

// data for graph 
      const data = {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            label: 'Score Ratio',
            data: [score, (( completedDays.length*3)-score)],
            backgroundColor: [
              '#172554',
              '#93c5ff'
            ],
            borderColor: [
              '#172554',
              '#93c5ff',
            ],
            borderWidth: 1,
          },
        ],
      }

      const options = { //For graph
        maintainAspectRatio: true,
      };

  return (
    <>
        <div className="w-full relative">
          

          <h3 className='font-sans text-1xl lg:text-2xl mt-16 lg:mt-0 ml-4 lg:mb-8 text-blue-950'>
          <FaDoorOpen className="text-[#172554] text-[40px] mr-2 inline mb-2" />
            Welcome {username}, Let's empower ourselves...</h3>




          <div className="grid grid-cols- sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-4 mt-4 mr-4">
            
            <div className=" box1  flex-1 p-5 h-[200px] rounded-2xl flex flex-col justify-center items-center relative ">
            <FaCalendarDays style={{ color: '#1d4ed9', fontSize: '100', marginRight:'8px', position:"absolute", bottom:"52px", left:"32px" }}/>
              <h2 className='font-sans text-3xl font-bold text-blue-700 absolute top-12 right-6'>Days Completed</h2>
              {loading ? <h2>Loading...</h2> : error ? <h2>Error: {error}</h2> : <h2 className='font-sans text-6xl absolute bottom-12 right-32 text-blue-400'>{days}</h2>}
            </div>

            <div className="flex-1 p-5 h-[200px] rounded-2xl bg-box2-gradient flex flex-col justify-center items-center relative border-blue-900">
              <h2 className='text-3xl font-bold text-blue-950 absolute top-12 right-28'>Score</h2>
              <FaStar style={{ color: '#172554', fontSize: '96', marginRight:'8px', position:"absolute", top:"48px", left:"32px" }}/>
              {loading ? <h2>Loading...</h2> : error ? <h2>Error: {error}</h2> : <h2  className='text-5xl absolute top-24 right-32 text-blue-900 font-bold'>{score}</h2>}
            </div>

            <div className="flex-1 p-5 h-[200px]  rounded-2xl bg-box3-gradient flex flex-col justify-center items-center">
              {/* Placeholder */}
            </div>
            <div className="flex-1 p-5 h-[200px] rounded-2xl bg-box4-gradient flex flex-col justify-center items-center">
              {/* Placeholder */}
            </div>
          </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 m-4">
        <div className="col-span-1 p-5 rounded-xl h-[424px] bg-blue-100 flex justify-center items-center">
          <div className="doughnut-graph text-center">
            <h2 className='font-sans text-3xl  text-left p-2 rounded-md  w-full '>Score ratio</h2>
            <br />
            <DoughnutChart data={data} options={options} />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 p-5 bg-blue-100  rounded-xl h-[424px]  flex justify-center items-center">
          <div className="w-full overflow-x-auto">
            <h2 className='text-3xl font-sans text-left'>Score ratio</h2>
            
            <LineChart />
          </div>
        </div>
        <div className="col-span-1 p-5  rounded-xl h-[424px] bg-blue-100 flex justify-center items-center">
          <div className="dashboardtable text-center flex flex-col items-center">
            <h2 className='font-sans text-3xl text-left p-2 rounded-md mb-3 w-full'>Completed Days ratio</h2>
            <br />
            <StatusTable />
          </div>
        </div>
      </div>

      <div className="m-6 p-6 flex justify-center items-center bg-blue-200 h-20 rounded-3xl">
        <h1 className='text-center text-blue-950'>Are you facing any problems, Don't hesitate to contact us. 24 hours response time<br/>
        support@megamind.com, 0091377467982</h1>
      </div>
   
    </>

  )
}

export default UserContent

