import React, { useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { hendleError, hendleSuccess } from '../Utils';
import { IoLogInSharp } from 'react-icons/io5';

const Login = () => {
    const [logininfo, setLogininfo] = useState({
        email: '',
        password: ''
    });

    const Navigate = useNavigate();

    const handleInputEvent = (e) => {
        const { name, value } = e.target;
        const copyLogininfo = { ...logininfo };
        copyLogininfo[name] = value;
        setLogininfo(copyLogininfo);
    };
    // console.log('signinfo -->', signinfo);

    const handleLoginForm = async (e) => {
        e.preventDefault();
        const { email, password } = logininfo;
        if (!email || !password) {
            return hendleError('Please, All fields are required');
        };

        try {
            const url = 'https://awesome-authentication.vercel.app/auth/login';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logininfo)
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
                }, 1000)
            } else if (!success) {
                hendleError(message)
            }

        } catch (error) {
            console.log('Error during sign up:', error);
        }

    };

    return (
        <div className='background-image flex items-center justify-center w-full h-[100vh] overflow-hidden'>
            <form onSubmit={handleLoginForm} className='flex flex-col items-center justify-center xs:px-4 xs:py-6 xs:w-[88%] md:w-[60%] lg:w-[45%] xl:w-[32%] text-[1em] tracking-[0.2px] rounded-md shadow-2xl text-gray-900 bg-[#F2F4F7]'>
                <h2 className='flex items-center justify-center text-[2em] font-semibold text-[#0866FF]'>
                    Login
                    <IoLogInSharp />
                </h2>
                <div className='flex flex-col gap-y-4 mt-10 w-full'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor="" className='italic text-md font-medium text-gray-600'>Email Address <span className='inline-block text-red-400'>*</span></label>
                        <input
                            type="text"
                            placeholder='Enter Your Email'
                            name='email'
                            className='w-full px-3 py-[8px] text-[0.99em] rounded-md'
                            onChange={handleInputEvent}
                            value={logininfo.email} />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor="" className='italic text-md font-medium text-gray-600'>Password <span className='inline-block text-red-400'>*</span></label>
                        <input
                            type="text"
                            placeholder='Enter Your Password'
                            name='password'
                            className='w-full px-3 py-[8px] text-[0.99em] rounded-md'
                            onChange={handleInputEvent}
                            value={logininfo.password} />
                    </div>
                </div>
                <div className='flex items-center justify-between xs:flex-col md:flex-row mt-10 xs:gap-y-1 w-full xs:text-[0.96em] md:text-[0.92em]'>
                    <NavLink to='/forgetPassword' className='cursor-pointer underline hover:text-blue-600'>
                        Forget Password?
                    </NavLink>
                    <div className='flex items-center justify-center gap-x-2'>
                        <p className='text-[0.98em]'>Don't have an account?</p>
                        <NavLink to='/signup' className='cursor-pointer underline hover:text-blue-600'>
                            Sign Up
                        </NavLink>
                    </div>
                </div>
                <div className='flex items-center justify-center xs:mt-3 md:mt-4 w-full'>
                    <button type='submit' className='w-full py-[8px] text-[1.1em] font-medium rounded-lg text-white bg-[#0866FF] hover:bg-blue-500 focus:bg-blue-400 duration-150'>
                        Login
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
