import { useState, useEffect } from 'react';
import '../../styles/user/articles.css';
import SideButtons from '../../components/user/SideButtons';
import logo from '../../assets/logo.svg';

const Articles = () => {
  const [day, setDay] = useState(null);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false); // Initially not loading
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (day === null) return;

      setLoading(true); // Start loading
      try {
        const response = await fetch(`http://localhost:8080/articles/day/${day}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticle(data[0]); // Assuming only one article per day
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchArticle();
  }, [day]);

  const handleDayChange = () => {
    const articleDay = document.getElementById('article_bar').value;
    setDay(articleDay);
  };

  return (
    <div className='m-7'>
      <label htmlFor="article_bar" className='text-xl font-sofia'>Enter the day number</label>
      <input
        type="number"
        placeholder="Eg: 3 "
        id="article_bar"
        className='w-[200px] h-auto text-2xl border mr-1 border-gray-400 p-2 inline font-sofia'
      />
      <button onClick={handleDayChange} className='w-auto p-2 bg-blue-300 font-sofia hover:bg-blue-800 hover:text-blue-200 h-auto text-2xl rounded-sm'>Show me the article</button>
      

      <div className='opacity-25 absolute top-[256px] right-[656px] z-0'>
        <img src={logo} alt="icon" className='w-[512px] h-[512px]'/>
      </div>
      <SideButtons />

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {!loading && !error && article && (
        <div className='text-xl relative z-1'>
          <h2 className='article-heading z-1 font-sofia p-2 w-[1200px]'>{article.title}</h2>
          {article.content.map((paragraph, index) => (
            <p key={index} className='para font-sofia text-2xl w-[1200px] ml-6'> <br/>{paragraph}</p>
          ))}
        </div>
      )}

      {!loading && !error && !article && day !== null && (
        <div>No article found for day {day}</div>
      )}
    </div>
  );
};

export default Articles;
