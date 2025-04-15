import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // hook from react-router

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Login successful!');
    
                // Development: Store token in localStorage
                localStorage.setItem('token', data.token); // Save token in localStorage
    
                // For production, the token should be set as an HttpOnly cookie on the backend.
                // Example: backend response should set the cookie like this:
                // res.cookie('token', data.token, { httpOnly: true, secure: true }); 
    
                console.log('Token:', data.token); // Token can be used for authorized API calls

                //Redirect to music page
                navigate('/music'); 
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };
    

    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Welcome Back</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
            <div className='mt-8'>
                <div>
                    <label className='text-lg font-medium'>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your email'
                    />
                </div>

                <div>
                    <label className='text-lg font-medium'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your password'
                    />
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input type='checkbox' id='remember' />
                        <label className='text-pink-700 ml-2 font-medium text-base' htmlFor='remember'>
                            Remember for 30 days
                        </label>
                    </div>
                    <button className='font-medium text-base text-black'>Forgot password</button>
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button
                        onClick={handleLogin}
                        className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-pink-700 text-white text-lg font-bold'
                    >
                        Sign in
                    </button>
                    <button className='text-black flex py-3 rounded-xl border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'>
                        Sign in with Google
                    </button>
                </div>
                <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>Don't have an account?</p>
                    <button className='text-pink-700 text-base font-medium ml-2'>Sign Up</button>
                </div>
            </div>
        </div>
    );
}
