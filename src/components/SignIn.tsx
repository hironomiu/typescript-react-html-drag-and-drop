import React, { useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((_prev) => (_prev = e.target.value))
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((_prev) => (_prev = e.target.value))
  }
  return (
    <div className="flex flex-col w-screen  items-center">
      <h1>SignIn</h1>
      <input type="text" value={email} onChange={handleEmailChange} />
      <input type="password" value={password} onChange={handlePasswordChange} />
    </div>
  )
}

export default SignIn
