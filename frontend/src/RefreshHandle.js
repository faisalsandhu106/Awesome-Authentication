import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandle = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const Navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('Token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup') {
                Navigate('/home', { replace: false });
            }
        }
    }, [location, Navigate, setIsAuthenticated]);

    return (
        null
    )
}

export default RefreshHandle