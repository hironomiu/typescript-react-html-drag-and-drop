import { render, screen } from '@testing-library/react'
import Profile from '../components/Profile'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/boardSlice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer, { setUser } from '../features/global/globalSlice'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
    global: globalReducer,
  },
})

describe('Profile', () => {
  it('Profile', async () => {
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
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Nick Name: 太郎')).toBeInTheDocument()
    expect(screen.getByText('Email: taro@example.com')).toBeInTheDocument()
    expect(screen.getByText('Top')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('top-button'))
    // TODO: clickイベントで遷移
    // expect(await screen.findByText('todo')).toBeInTheDocument()
  })
})
