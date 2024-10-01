import { Profiler, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home.js';
import Swipe from './pages/Swipe.js';
import Cart from './pages/Cart.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import RefreshHandler from './refreshHandler';
import Newsletter from './pages/Newsletter.js';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />

  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/newsletter_signup' element={<Newsletter />} />
        <Route path='/swipenow' element={<PrivateRoute element={<Swipe />} />} />
        <Route path='/cart' element={<PrivateRoute element={<Cart />} />} />


      </Routes>
    </div>
  );
}

export default App;