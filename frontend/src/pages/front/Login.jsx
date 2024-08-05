import { useState, useContext } from "react";
import { Navigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import '../../styles/front/styles.css';
import { toast } from "react-toastify";

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
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      );
    };
    

export default Login