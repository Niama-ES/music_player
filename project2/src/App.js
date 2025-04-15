import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import Login from './Login';
import CA from './CA'
import MusicPage from './MusicPage'
import './App.css'
import Home from './home';



function App() {
  return (
    <div className='App'>
    <Router>
            <div className='presentation'>
            <nav>
                <Link to='/' className='link'><h1>BeatBox</h1></Link>
                <div className='login'>
                <Link to="/CA" className="link"><p>Create Account</p></Link>
                <Link to="/Login" className="link"><button>Login Now</button></Link>
                <Outlet />
                </div>
            </nav>
            </div>

            

            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/CA" element={<CA />} />
            <Route path="/music" element={<MusicPage />} />
            </Routes>
    </Router>
    </div>
  );
}
export default App;