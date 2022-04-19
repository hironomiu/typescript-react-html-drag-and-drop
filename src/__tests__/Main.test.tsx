import { render, screen } from '@testing-library/react'
import Main from '../components/Main'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/board.Slice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer from '../features/global/globalSlice'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

process.env.REACT_APP_API_URL = 'http://localhost:8888'

const handlers = [
  rest.get('http://localhost:8888/api/v1/boards', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: 'todo' },
        { id: 2, title: 'doing' },
        { id: 3, title: 'done' },
      ])
    )
  }),
]

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
      <Provider store={store}>
        <Main />
      </Provider>
    )
    expect(await screen.findByText(/todo/)).toBeInTheDocument()
    expect(screen.getByText(/doing/)).toBeInTheDocument()
    expect(screen.getByText(/done/)).toBeInTheDocument()
  })
})
