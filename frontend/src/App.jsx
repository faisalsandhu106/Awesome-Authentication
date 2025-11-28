import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useState } from 'react'
import RefreshHandle from './RefreshHandle'
import ForgetPass from './Pages/ForgetPass'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : < Navigate to="/login" />
  }

  return (
    <>
      <RefreshHandle setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetPassword" element={<ForgetPass />} />
      </Routes>
    </>
  )
}

export default App
