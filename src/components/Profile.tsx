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
    <div className="flex flex-col items-center">
      <h1 className="mt-10 text-2xl font-bold">Profile</h1>
      <div className="flex flex-col">
        <span className="my-2">Nick Name: {user.nickname}</span>
        <span className="my-2">Email: {user.email}</span>
      </div>
      <span
        onClick={handleTopClick}
        data-testid="top-button"
        className="hover:cursor-pointer hover:border-b-2 hover:border-b-black"
      >
        Top
      </span>
    </div>
  )
}

export default Profile
