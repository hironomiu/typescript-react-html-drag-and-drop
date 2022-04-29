import { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import {
  fetchCsrfToken,
  fetchCheckSignIn,
} from '../features/global/globalSlice'

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchCsrfToken())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCheckSignIn())
  }, [dispatch])
  return (
    // Gradient Color Stops https://tailwindcss.com/docs/gradient-color-stops
    <div className="m-0 overflow-hidden h-[100vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Header />
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
