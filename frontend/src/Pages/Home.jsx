import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { hendleSuccess } from '../Utils'

const Home = () => {
  const [loginUser, setLoginUser] = useState('')  // State to hold logged-in user's name
  const Navigate = useNavigate();                // Hook for navigation

  useEffect(() => {
    setLoginUser(localStorage.getItem("UserName"))
  })

  const handleLogout = () => {
    localStorage.removeItem("Token")      // Clear stored token
    localStorage.removeItem("UserName")  // Clear stored user name
    hendleSuccess('Logout Successful')
    setTimeout(() => {
      Navigate('/login')
    }, 1000)
  }

  return (
    <div className='flex items-center justify-center flex-col gap-y-4 w-full h-[100vh]'>
      <div className='text-2xl font-medium capitalize'>Welcom {loginUser}</div>
      <button onClick={handleLogout} type='submit' className='text-sm mt-3 px-3 py-2 rounded-sm text-white bg-blue-600 hover:bg-blue-500 focus:bg-blue-400 duration-150'>
        Logout
      </button>
      <ToastContainer />
    </div>
  )
}

export default Home