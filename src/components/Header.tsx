import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import {
  selectCsrfToken,
  selectIsAuthentication,
  setIsAuthentication,
  fetchSignOut,
} from '../features/global/globalSlice'

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthentication = useSelector(selectIsAuthentication)
  const csrfToken = useSelector(selectCsrfToken)
  const handleClick = () => {
    dispatch(fetchSignOut(csrfToken))
    dispatch(setIsAuthentication(false))
  }
  return (
    <header className="flex h-20 border-b-[1px] items-center space-x-4 text-white font-bold text-2xl justify-between">
      <div className="ml-4">Super DnD</div>
      <nav>
        {isAuthentication ? (
          <span className="mr-10 hover:cursor-pointer" onClick={handleClick}>
            SignOut
          </span>
        ) : null}
      </nav>
    </header>
  )
}

export default Header
