import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../app/store'
import {
  setIsAuthentication,
  selectIsAuthentication,
} from '../features/global/globalSlice'
import { fetchSignIn } from '../features/global/globalSlice'

const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const isAuthentication = useSelector(selectIsAuthentication)
  const navigate = useNavigate()
  const ref = useRef<HTMLInputElement>(null!)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((_prev) => (_prev = e.target.value))
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((_prev) => (_prev = e.target.value))
  }
  const handleClick = () => {
    dispatch(fetchSignIn({ email: email, password: password }))
    dispatch(setIsAuthentication(true))
  }
  useEffect(() => {
    if (isAuthentication) navigate('/')
  }, [isAuthentication, navigate])
  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <div className="flex flex-col h-[50%] w-screen  items-center justify-center">
      <h1 className="text-3xl mb-10 font-bold text-white">SignIn</h1>
      <div>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="email"
          className="mb-5 h-8 p-2"
          ref={ref}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
          className="mb-5 h-8 p-2"
        />
      </div>
      <button
        onClick={handleClick}
        data-testid="signin-button"
        disabled={!email || !password}
        className="border-[1px] w-24 h-8 text-gray-100 disabled:text-gray-400"
      >
        SignIn
      </button>
    </div>
  )
}

export default SignIn
