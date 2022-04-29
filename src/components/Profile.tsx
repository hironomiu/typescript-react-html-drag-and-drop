import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/global/globalSlice'

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const handleTopClick = () => {
    navigate('/')
  }
  return (
    <div className="flex flex-col">
      <h1 className="mt-10 text-2xl font-bold">Profile</h1>
      <div className="flex flex-col">
        <span>nickname:{user.nickname}</span>
        <span>email:{user.email}</span>
      </div>
      <span onClick={handleTopClick}>Top</span>
    </div>
  )
}

export default Profile
