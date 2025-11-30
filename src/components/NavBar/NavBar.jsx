import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContext.jsx';
import { FaHome, FaUserFriends } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ResgisterImg from '../../../public/iconRegister.png'
import UserProfileHook from '../../Hooks/UserProfileHook.jsx';

export default function NavBar() {
  const navigate = useNavigate();
  const { Token, setToken } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: userProfile } = UserProfileHook();

  const logOut = () => {
    localStorage.removeItem('UserToken');
    setToken(null);
    navigate('/login');
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <nav className='w-full shadow-2xl flex justify-center items-center  py-3 px-4 sticky top-0 z-50 backdrop-blur-sm '>
      {Token ? (
        <div className='max-w-2xl xl:max-w-7xl w-full flex  justify-between items-center'>

          {/* Logo - Right Side */}
          <Link to='/home' className='flex items-center gap-2 '>
            <span className='bg-white rounded-full p-2 flex items-center justify-center'>
              <img src={ResgisterImg} alt="Bchat logo" className='w-5 h-5' />
            </span>
            <h3 className='animate-pulse transition-all duration-300 bg-linear-to-l text-transparent bg-clip-text from-[#FFFD02] to-[#999801] text-xl font-bold'>
              Bchat
            </h3>
          </Link>



          {/* Links - Center on Desktop */}
          <ul className={`
        
          
            md:flex md:items-center  md:gap-8 md:flex-1 md:justify-center
            ${isMobileMenuOpen ? 'flex' : 'hidden'}
            absolute md:relative top-16 md:top-0 left-0 md:left-auto
            w-full md:w-auto
            flex-col md:flex-row
            bg-white md:bg-transparent
            shadow-lg md:shadow-none
            py-4 md:py-0
            gap-4 md:gap-8
          `}>
            <li className='flex  md:w-[10%] w-full justify-center items-center'>
              <NavLink
                to='/home'
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'flex w-[50%] items-center justify-center text-2xl rounded-full p-1 bg-yellow-400 text-white shadow-lg shadow-yellow-500/50 transform scale-110 transition-all duration-300'
                    : 'flex  w-[50%] items-center justify-center text-2xl rounded-full p-1 bg-white text-gray-700 hover:bg-linear-to-br hover:from-yellow-400 hover:to-orange-500 hover:text-white hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-110 transform transition-all duration-300 shadow-md'
                }
              >
                <FaHome />
              </NavLink>
            </li>
          
            <li className='flex  md:w-[10%] w-full justify-center items-center'>
              <NavLink
                onClick={() => {
                  logOut();
                  setIsMobileMenuOpen(false);
                }}
                to='/login'
                className={({ isActive }) =>
                  isActive
                    ? 'flex  w-[50%] items-center justify-center text-2xl rounded-full p-1 bg-linear-to-br from-red-400 to-pink-500 text-white shadow-lg shadow-red-500/50 transform scale-110 transition-all duration-300'
                    : 'flex w-[50%] items-center justify-center text-2xl rounded-full p-1 bg-white text-gray-700 hover:bg-linear-to-br hover:from-red-400 hover:to-pink-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50 hover:scale-110 transform transition-all duration-300 shadow-md'
                }
              >
                <IoLogOut />
              </NavLink>
            </li>
          </ul>

          {/* User Info - Left Side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-white font-semibold text-sm">{userProfile?.name || 'User'}</span>
            </div>
            <div className="relative">
              <img
                src={userProfile?.photo || 'https://linked-posts.routemisr.com/uploads/default-profile.png'}
                alt={userProfile?.name || 'User'}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FFFD02] focus:ring-4 focus:ring-[#FFFD02] transition-all duration-300 cursor-pointer hover:ring-4 hover:ring-[#FFFD02]"
              />
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#282828] animate-pulse"></span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className='md:hidden flex items-center justify-center text-2xl text-gray-700 bg-white rounded-full p-2 hover:bg-gray-100 transition-all duration-300'
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>


        </div>
      ) : null}
    </nav>
  )
}
