import { useState, useContext } from "react";
import { Navigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import '../../styles/front/styles.css';
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";

const Login = () => {

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState(null);
      const [redirectTo, setRedirectTo] = useState(null);
      const { login } = useContext(AuthContext);
    
      const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });
    
          if (!response.ok) {
            throw new Error('Login failed');
          }
    
          const data = await response.json();
          login({ token: data.token, role: data.role });
          toast.success('Welcome, Login successful!');
          setEmail('');
          setPassword('');
          setError(null);
          // alert('Login successful');
          if (data.role === 'admin') {
            setRedirectTo('/admin/home');
          } else {
            setRedirectTo('/user/home');
            toast.success('Welcome, Login successful!');
          }
        } catch (error) {
          setError(error.message);
          toast.error('Invalid credentials');
        }
      };
    
      if (redirectTo) {
        return <Navigate to={redirectTo} />;
      }

      return (

        <div className="bg-homebg min-h-screen flex flex-col items-center justify-center font-sofia">


        <div className="login-container border-blue-950 border rounded-lg shadow-lg shadow-blue-950 bg-homebg">
          <h2 className="text-4xl text-blue-950 font-bold font-sofia">Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label className="text-2xl font-sofia">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-sofia"
                placeholder="example@megamind.com"
                required
                />
            </div>
            <div>
              <label className="text-2xl font-sofia">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="font-sofia"
                required
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" className="font-sofia text-xl">Login</button>
            <br/><br/>
            <span className="cursor-pointer font-sofia text-xl"> Forgot password?</span>
            <br/>
            <span className="cursor-pointer font-sofia text-xl"> Are you a new user? Let's get started <FaArrowRight className=" inline text-sm"/></span>
          </form>
        </div>
      </div>
      );
    };
    

export default Login