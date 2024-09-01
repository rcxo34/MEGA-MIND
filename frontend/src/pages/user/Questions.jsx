 import React, { useEffect, useState, useContext } from 'react';
import '../../styles/user/questions.css';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import SideButtons from '../../components/user/SideButtons';
import logo from '../../assets/logo.svg';

const Questions = () => {
  const { getToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [searchDay, setSearchDay] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const token = getToken();
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  // Initialize solutions state with default structure
  const initialSolutionsState = [
    { question: 'Question 1', solution: null },
    { question: 'Question 2', solution: null },
    { question: 'Question 3', solution: null },
    // Add more questions as needed
  ];

  const [solutions, setSolutions] = useState(initialSolutionsState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchDay === null) {
          return;
        }
        const response = await fetch(`http://localhost:8080/questions/day/${searchDay}`);

        if (!response.ok) {
          throw new Error('Error fetching questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const getCurrentDays = async () => {
      try {
        setCompletedDays([]); // Clear state before fetching new data
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
        console.log(data);
        const daysArray = data.totalDays.map(obj => obj.day);
        console.log(daysArray)
        setCompletedDays(daysArray);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
    getCurrentDays();
  }, [searchDay]);

  const handleSolutionChange = (index, solutionIndex) => {
    const updatedSolutions = [...solutions];
    updatedSolutions[index].solution = solutionIndex;
    setSolutions(updatedSolutions);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let scoreToAdd = 0;

    questions.forEach((question, index) => {
      const userAnswer = answers[`question${index}`];
      const correctAnswer = question.options[question.solution]; // Assuming question.solution holds the index of correct answer
    
      const updatedSolutions = [...solutions];
      console.log(updatedSolutions);
      updatedSolutions[index].solution = correctAnswer; // Assign user's answer to solutions
      setSolutions(updatedSolutions);
    
      if (userAnswer === correctAnswer) {
        scoreToAdd += 1;
      }
    });
    

    setScore(scoreToAdd);

    const normalizedSearchDay = Number(searchDay);

    if (completedDays.includes(normalizedSearchDay)) {
      alert(`Day ${searchDay} already completed`);
      setSubmitted(true);
    } else {
      try {
        await addCompleted(normalizedSearchDay,scoreToAdd);
        await addScore(scoreToAdd);
        setSubmitted(true);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const addScore = async (scoreToAdd) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/addScore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ scoreToAdd })
      });
      if (!response.ok) {
        throw new Error('Score not updated');
      }
      alert('Score updated!');
    } catch (error) {
      throw new Error('Error updating score:', error);
    }
  };

  const addCompleted = async (normalizedSearchDay, score) => {
    if(normalizedSearchDay==0){
      toast.error('Select a day!')
      return
    }
    try {
      const response1 = await fetch(`http://localhost:8080/users/${userId}/dayCompleted`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ dayNumber: normalizedSearchDay, score:score }),
      });
      if (!response1.ok) {
        throw new Error('Day not added');
      }
      alert('Day added to completed list!');
    } catch (error) {
      throw new Error('Error adding day:', error);
    }
    try{
      const response2 = await fetch(`http://localhost:8080/users/${userId}/day`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    }catch{

    }
  };

  const handleSearchSubmit = () => {
    const input_day = document.getElementById('search_bar').value;
    setSearchDay(input_day);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className='m-7'>
      <label htmlFor="search_bar" className='text-xl font-sofia'>Enter the day number</label>
      <input
        type="number"
        placeholder="Eg: 3 "
        id="search_bar"
        className='w-[200px] h-auto text-2xl border mr-1 border-gray-400 p-2 inline font-sofia'
      />
      <button onClick={handleSearchSubmit} className='w-auto p-2 bg-blue-300 font-sofia hover:bg-blue-800 hover:text-blue-200 h-auto text-2xl rounded-sm'>Let me try the Questions</button>
      
      
      <div className='opacity-25 absolute top-[256px] right-[88px] z-0'>
        <img src={logo} alt="icon" className='w-[512px] h-[512px]'/>
      </div>
      <SideButtons/>
      
        {/* <input
          type="number"
          placeholder="Enter day number"
          id="search_bar"
          className="full-width search-input move-search"
        />
        <button onClick={handleSearchSubmit} className="full-width submit-btn1 search-input move-btn">
          Find
        </button> */}
      

      {error && <p>{error}</p>}

      <div className='ml-12 mt-6'>
      <form onSubmit={handleSubmit} className="question_form full-width relative z-10">
        {questions.map((question, index) => (
          <div key={index} className="full-width text-xl">
            <h3 className="select question-box font-sofia">{question.question}</h3>
            {question.options.map((option, optionIndex) => (
              <label className="select font-sofia text-xl " key={optionIndex}>
                <input
                  className="select m-3 font-sofia"
                  type="radio"
                  name={`question${index}`}
                  value={option}
                  checked={answers[`question${index}`] === option}
                  onChange={handleChange}
                  required
                />
                {option}
              </label>
            ))}
          </div>
          
        ))}
        
         {searchDay && <button type="submit" className="font-sofia text-2xl w-full ml-9 p-1 bg-blue-900 hover:bg-blue-500 rounded-lg text-blue-200 ">
            Submit
          </button>}
        
      </form>
      </div>

      {score !== null && (
        <div className="full-width">
          <h2>
            Your score: {score}/{questions.length}
          </h2>
        </div>
      )}

      {submitted && (
        <div className="full-width">
          <h2>Correct Solutions</h2>
          <ul className="full-width">
            {solutions.map((question, index) => (
              <li key={index}>
                <strong>{question.question}:</strong> {question.solution}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Questions;