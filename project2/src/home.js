import './App.css'
import React from 'react';
import gifImage from './output-onlinegiftools.gif';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import Login from './Login';
export default function Home() {
    return <>
    <div className='presentation'>
        <h1 className='h11'>Discover, Stream, and Enjoy <br /> Endless Music</h1>
            <div className="GIF">
            <img src={gifImage} alt="Example GIF" />
            </div>
        </div>
        { /* move the code that should not be shown on every page here... */ }
        <div className='part2'>
            <p class="new">New Features Available</p>
            <h1>Discover the Ultimate Music Experience</h1>
            <p>Immerse yourself in a world of music with our app. Stream, explore, and enjoy a vast library <br /> of songs from various genres. Create personalized playlists, discover new tracks, and let the <br /> rhythm guide your journey. Download now and unlock a world of endless musical <br /> possibilities..</p>
            <Link to="/Login" className="link"><button>Login for More</button></Link>
            </div>
            <Routes>
            <Route path="/Login" element={<Login />} />
            </Routes>
    </>;
}