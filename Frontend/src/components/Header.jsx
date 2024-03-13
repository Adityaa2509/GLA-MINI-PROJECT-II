import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faSearch } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    
  };
  return (
     <nav className=" w-[1600px] ml-[-190px] bg-blue-500 text-white shadow-md fixed top-0 z-10 rounded-b-xl">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 ml-[-120px]">
          <img src="./src/assets/blog.png" alt="Blogify Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Blogify</h1>
        </div>
        
        <div className="flex space-x-6">
          <a href="/" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Home</a>
          <a href="/blogs" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">Blogs</a>
        </div>
        <div className="flex items-center space-x-12">
          <div className="relative">
            <input type="text" placeholder="Search" className="bg-gray-200 text-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-56" />
            <button className="absolute right-0 top-0 mt-0 mr-2 px-4 py-2  text-white rounded-full">
              <FontAwesomeIcon icon={faSearch} className='text-gray-500'/>
            </button>
          </div>
          <div className='flex space-x-2 text-2xl'>
          <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} className="cursor-pointer text-yellow-50" onClick={toggleTheme} />
           <p className="font-semibold text-sm">{theme === 'light' ? 'Dark' : 'Light'}</p>
           </div>
           <div className="inline-block">
            <Link to="/signin">
                  <button className="inline-block py-2 px-4 border-2 border-gradient bg-white text-gray-800 font-bold rounded transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-gray-400 hover:text-white hover:border-white">
                 Sign In
                </button>
            </Link>
        </div>
        </div>
      </div>
    </nav>
      )
}

export default Header
