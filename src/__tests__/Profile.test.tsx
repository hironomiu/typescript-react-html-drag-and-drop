import { render, screen } from '@testing-library/react'
import Profile from '../components/Profile'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/boardSlice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer, { setUser } from '../features/global/globalSlice'
import { BrowserRouter } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { handlers } from '../handlers'

const server = setupServer(...handlers)

const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
    global: globalReducer,
  },
})

beforeEach(() => {
  server.listen()
})

describe('Profile', () => {
  it('Profile', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Profile')).toBeInTheDocument()

    const action = {
      type: setUser.type,
      payload: {
        isSuccess: true,
        id: 1,
        nickname: '太郎',
        email: 'taro@example.com',
        message: 'success',
      },
    }
    store.dispatch(action)

    expect(await screen.findByText('Profile')).toBeInTheDocument()
    // screen.debug()
  })
})
