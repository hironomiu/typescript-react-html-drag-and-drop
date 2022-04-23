import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import {
  selectIsAuthentication,
  selectIsSignOutModalOn,
  setIsSignOutModalOn,
} from '../features/global/globalSlice'
import SignOutModal from './modal/SignOutModal'

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthentication = useSelector(selectIsAuthentication)
  const isSignOutModalOn = useSelector(selectIsSignOutModalOn)
  const handleClick = () => {
    dispatch(setIsSignOutModalOn(true))
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
        {/* TODO: 上に組み込む方が自然 */}
        {isSignOutModalOn ? <SignOutModal /> : null}
      </nav>
    </header>
  )
}

export default Header
