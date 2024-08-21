import './App.css';
import Home from "./pages/Home.jsx"
import Auth from './pages/Auth.jsx';
import Swipe from "./pages/Swipe.jsx"
import OnBoarding from './pages/Onboarding.jsx';
import Cart from "./pages/Cart.jsx"
import { Routes, Route } from "react-router-dom"
import Newsletter from './pages/Newsletter.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/swipenow' element={<Swipe />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/newsletter_signup" element={<Newsletter />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
