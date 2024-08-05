import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/Home';
import Home2 from './pages/admin/Home';
import Articles from './pages/user/Articles';
import FrontLayout from './layouts/FrontLayout';
import FrontHome from './pages/front/FrontHome';
import Certificate from './pages/user/Certificate';
import Community from './pages/user/Community';
import Materials from './pages/user/Materials';
import Statistics from './pages/user/Statistics';
import Support from './pages/user/Support';
import Questions from './pages/user/Questions';
import Signup from './pages/front/Signup';
import Login from './pages/front/Login';
import Curriculum from './pages/user/Curriculum';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      {
        path: '/',
        element: <FrontHome />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      {        
        path: '/user/home',
        element: 
        (<ProtectedRoute requiredRole="user">
          <Home />
        </ProtectedRoute>),
      },
      {
        path: '/user/articles',
        element:
        (<ProtectedRoute requiredRole="user">
         <Articles />
        </ProtectedRoute>),
      },
      {
        path: '/user/questions',
        element: 
        (<ProtectedRoute requiredRole="user">
          <Questions />
          </ProtectedRoute>),
      },
      {
        path: '/user/curriculum',
        element: 
        (<ProtectedRoute requiredRole="user">
          <Curriculum />
         </ProtectedRoute>),
      },
      {
        path: '/user/materials',
        element:
        (<ProtectedRoute requiredRole="user">
         <Materials />
        </ProtectedRoute>),
      },
      {
        path: '/user/statistics',
        element:
        (<ProtectedRoute requiredRole="user">
         <Statistics />
        </ProtectedRoute>),
      },
      {
        path: '/user/community',
        element:
        (<ProtectedRoute requiredRole="user">
         <Community />
        </ProtectedRoute>),
      },
      {
        path: '/user/certificate',
        element:
        (<ProtectedRoute requiredRole="user">
         <Certificate />
        </ProtectedRoute>),
      },
      {
        path: '/user/support',
        element:
        (<ProtectedRoute requiredRole="user">
         <Support />
        </ProtectedRoute>),
      },
    ]
  },
  {
    path:'/admin/home',
    element: 
    (<ProtectedRoute requiredRole="admin">
      <Home2 />
    </ProtectedRoute>)
      
  }

])

const App = () => {
  return (
    <>
      <AuthProvider>
      <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
