import Header from './Header'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    // Gradient Color Stops https://tailwindcss.com/docs/gradient-color-stops
    <div className="m-0 overflow-hidden h-[100vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Header />
      {/* <Main /> */}
      <Outlet />
    </div>
  )
}

export default Layout
