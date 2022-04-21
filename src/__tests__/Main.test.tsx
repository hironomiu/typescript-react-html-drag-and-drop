import { render, screen } from '@testing-library/react'
import Main from '../components/Main'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/boardSlice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer from '../features/global/globalSlice'
import { setupServer } from 'msw/node'
import { BrowserRouter } from 'react-router-dom'
import { handlers } from '../handlers'

process.env.REACT_APP_API_URL = 'http://localhost:8888'

const server = setupServer(...handlers)

beforeEach(() => {
  server.listen()
})

const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
    global: globalReducer,
  },
})

describe('Main', () => {
  it('Main', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    )
    expect(await screen.findByText(/todo/)).toBeInTheDocument()
    expect(screen.getByText(/doing/)).toBeInTheDocument()
    expect(screen.getByText(/done/)).toBeInTheDocument()
  })
})
