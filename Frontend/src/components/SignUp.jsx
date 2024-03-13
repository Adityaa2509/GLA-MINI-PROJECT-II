import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate = useNavigate();
   const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cnfpassword:''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
   const handleSubmit = async(e) => {
   
    e.preventDefault();
    
    try{
      const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
      
        if(res.status == 200)
        navigate('/signin');
      
    }catch(err)
  {
    toast.error(err.message, { position: toast.POSITION.BOTTOM_RIGHT});
console.error('Sign-in error:', err.message);
  }


  };
  
  return (
    
<div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cnfpassword"
            type="password"
            placeholder="******************"
          onChange={handleChange}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
       <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
              Sign In
            </Link>
          </div>
</div>       

    
  )
}

export default SignUp
