import React, { useState } from 'react'
import useAuthStore from '../Store/useAuthStore.js'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { signup, isLoading } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup({ fullname, username, password })
    }

    return (
        <section className='bg-[#082E55] h-screen flex flex-col items-center justify-center text-white'>
            <h1 className='text-white text-6xl mb-5 p-10 font-extrabold'>Signup</h1>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input
                    className='text-2xl text-white p-2 text-center font-bold text-black'
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <input
                    className='text-2xl  text-white
                     p-2 text-center font-bold text-black'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className='text-2xl text-white p-2 text-center font-bold text-black'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Signup'}
                </button>
            </form>

            <p className='mt-4'>
                Already have an account? 
                <Link to='/login' className='text-blue-300 ml-1'>Login</Link>
            </p>
        </section>
    )
}

export default Signup