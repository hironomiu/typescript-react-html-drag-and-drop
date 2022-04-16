import { render, screen } from '@testing-library/react'
import Main from '../components/Main'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/board.Slice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer from '../features/global/globalSlice'

const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
    global: globalReducer,
  },
})

describe('Main', () => {
  it('Main', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    )
    expect(screen.getByText(/todo/)).toBeInTheDocument()
    expect(screen.getByText(/doing/)).toBeInTheDocument()
    expect(screen.getByText(/done/)).toBeInTheDocument()
  })
})
