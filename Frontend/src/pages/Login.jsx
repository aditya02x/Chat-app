import React from 'react'
import { useState } from 'react'
import useAuthStore from '../Store/useAuthStore.js'
import { useNavigate ,Link } from 'react-router-dom'


const Login = () => {
    const navigate =useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { login, isLoading } = useAuthStore()

    const handelSubmit = async (e)=>{
        e.preventDefault() 
       const sucess= await login({username,password})
       if(sucess) navigate('/')
    }
  return (
   <section className='bg-[#082E55] h-screen flex flex-col items-center justify-center text-white'>
    <h1 className='text-4xl'>Login</h1>

    <form action="" onSubmit={handelSubmit}>
        <input type="text" placeholder="username" value={username}  onChange={(e)=> setUsername(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
        </button>
    </form>
                <p className='mt-4'>
                    Dont have an account? 
                    <Link to='/signup' className='text-blue-300 ml-1'>Create Account</Link>
                </p>

   </section>
  )
}

export default Login
