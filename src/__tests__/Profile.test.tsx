import { render, screen } from '@testing-library/react'
import Profile from '../components/Profile'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/boardSlice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer from '../features/global/globalSlice'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
    global: globalReducer,
  },
})

describe('Profile', () => {
  it('Profile', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })
})
