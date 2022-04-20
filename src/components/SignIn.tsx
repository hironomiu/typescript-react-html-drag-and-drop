import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../app/store'
import {
  setIsAuthentication,
  selectIsAuthentication,
} from '../features/global/globalSlice'
const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const isAuthentication = useSelector(selectIsAuthentication)
  const navigate = useNavigate()
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((_prev) => (_prev = e.target.value))
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((_prev) => (_prev = e.target.value))
  }
  const handleClick = () => {
    dispatch(setIsAuthentication(true))
  }
  useEffect(() => {
    if (isAuthentication) navigate('/')
  }, [isAuthentication, navigate])
  return (
    <div className="flex flex-col w-screen  items-center">
      <h1>SignIn</h1>
      <input type="text" value={email} onChange={handleEmailChange} />
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleClick} data-testid="signin-button">
        SignIn
      </button>
    </div>
  )
}

export default SignIn
