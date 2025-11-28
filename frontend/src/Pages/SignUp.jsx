import React, { useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { hendleError, hendleSuccess } from '../Utils';
import { RiAccountCircle2Fill } from 'react-icons/ri';

const SignUp = () => {
  const [signinfo, setSigninfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const Navigate = useNavigate();

  const handleInputEvent = (e) => {
    const { name, value } = e.target;
    const copySigninfo = { ...signinfo };
    copySigninfo[name] = value;
    setSigninfo(copySigninfo);
  };
  // console.log('signinfo -->', signinfo);

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    const { name, email, password } = signinfo;
    if (!name || !email || !password) {
      return hendleError('Please, All fields are required');
    };

    try {
      const url = 'http://localhost:3000/auth/signup';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signinfo)
      });
      const data = await res.json();
      // console.log('Sign up response -->', data)

      const { success, message, jwtToken, name } = data;
      if (success) {
        hendleSuccess(message)
        localStorage.setItem('Token', jwtToken)
        localStorage.setItem('UserName', name)
        setTimeout(() => {
          Navigate('/home')
        }, 2000)
      } else if (!success) {
        hendleError(message)
        setTimeout(() => {
        }, 2000)
      }

    } catch (error) {
      console.log('Error during sign up:', error);
    }

  };

  return (
    <div className='background-image flex items-center justify-center w-full h-[100vh] overflow-hidden'>
      <form onSubmit={handleSignUpForm} className='flex flex-col items-center justify-center xs:px-4 xs:py-6 xs:w-[88%] md:w-[60%] lg:w-[45%] xl:w-[32%] text-[1em] tracking-[0.2px] rounded-md shadow-2xl text-gray-900 bg-[#F2F4F7]'>
        <h2 className='flex items-center justify-center gap-x-1 text-[2em] font-semibold text-[#0866FF]'>
          Sign Up
          <RiAccountCircle2Fill />
        </h2>
        <div className='flex flex-col gap-y-4 mt-10 w-full'>
          <div className='flex flex-col gap-y-1'>
            <label htmlFor="" className='italic text-md font-medium text-gray-600'>Full Name <span className='inline-block text-red-400'>*</span></label>
            <input
              type="text"
              placeholder='Enter Your Name'
              autoComplete='off'
              name='name'
              className='w-full px-3 py-[8px] text-[0.99em] rounded-md'
              onChange={handleInputEvent}
              value={signinfo.name} />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label htmlFor="" className='italic text-md font-medium text-gray-600'>Email Address <span className='inline-block text-red-400'>*</span></label>
            <input
              type="text"
              placeholder='Enter Your Email'
              autoComplete='off'
              name='email'
              className='w-full px-3 py-[8px] text-[0.99em] rounded-md'
              onChange={handleInputEvent}
              value={signinfo.email} />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label htmlFor="" className='italic text-md font-medium text-gray-600'>Password <span className='inline-block text-red-400'>*</span></label>
            <input
              type="text"
              placeholder='Enter Your Password'
              autoComplete='off'
              name='password'
              className='w-full px-3 py-[8px] text-[0.99em] rounded-md'
              onChange={handleInputEvent}
              value={signinfo.password} />
          </div>
        </div>
        <div className='flex items-center justify-center mt-10 xs:gap-y-1 gap-x-2 w-full xs:text-[0.96em] md:text-[0.94em]'>
          <p>Already have an account?</p>
          <NavLink to='/login' className='cursor-pointer underline hover:text-blue-600'>
            Login
          </NavLink>
        </div>
        <div className='flex items-center justify-center xs:mt-3 md:mt-4 w-full'>
          <button type='submit' className='w-full py-[8px] text-[1.1em] font-medium rounded-lg text-white bg-[#0866FF] hover:bg-blue-500 focus:bg-blue-400 duration-150'>
            Sign Up
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignUp