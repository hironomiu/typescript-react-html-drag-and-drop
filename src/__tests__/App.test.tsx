import { render, screen } from '@testing-library/react'
import App from '../App'
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

describe('App', () => {
  it('App', async () => {
    render(<App />)
    expect(await screen.findByText('todo')).toBeInTheDocument()
  })
})
