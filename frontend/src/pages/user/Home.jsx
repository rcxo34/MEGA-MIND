import { useState, useEffect } from "react";
import UserContent from "../../components/user/UserContent";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  return (
    <UserContent />
      
      
    
  );
}
export default Home