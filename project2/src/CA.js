import React, { useState } from 'react';

function CA() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = async () => {
        try {
            const response = await fetch('http://localhost:3001/CA', { // Change 'register' to 'CA'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Account created successfully!');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };
    

    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Welcome Back</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>
                Welcome back! Please enter your details.
            </p>
            <div className='mt-8'>
                <div>
                    <label className='text-lg font-medium'>Email</label>
                    <input
    type='email'
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-black'
    placeholder='Enter your email'
/>
                </div>

                <div>
                    <label className='text-lg font-medium'>Password</label>
                    <input
    type='password'
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-black'
    placeholder='Enter your password'
/>

                </div>

                <div className='mt-8 flex flex-col gap-y-4'>
                    <button
                        onClick={handleCreateAccount}
                        className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-pink-700 text-white text-lg font-bold'
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CA;
