import { useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import { useDispatch } from 'react-redux'
import { fetchBoards } from '../features/board/board.Slice'
const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])
  return (
    <>
      <Header />
      <Main />
    </>
  )
}

export default Layout
