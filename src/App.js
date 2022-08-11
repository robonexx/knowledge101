import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// styles
import './App.css';
import Navbar from './components/navbar/Navbar';
import OnlineUsers from './components/onlineusers/OnlineUsers';
import Sidebar from './components/sidebar/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';

// pages
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Post from './pages/post/Post';
import Signup from './pages/signup/Signup';

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route exact path='/'
                element={!user ? <Navigate to='/login' /> : <Dashboard />}
              />
              <Route path='create'
                element={!user ? <Navigate to='/login' /> : <Create />}
              />
              <Route path='schemas/:id'
                element={!user ? <Navigate to='/login' /> : <Post />}
              />
              <Route path='login'
                element={!user ?  <Login /> : <Navigate to='/' />}
              />
              <Route path='signup'
                element={user && user.displayName ? <Navigate to='/' /> : <Signup />}
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
