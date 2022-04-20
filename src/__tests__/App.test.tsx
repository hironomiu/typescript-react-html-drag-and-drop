import { render, screen } from '@testing-library/react'
import App from '../App'
import { setupServer } from 'msw/node'
import { handlers } from '../handlers'
process.env.REACT_APP_API_URL = 'http://localhost:8888'

const server = setupServer(...handlers)

beforeEach(() => {
  server.listen()
})

describe('App', () => {
  it('App', async () => {
    render(<App />)
    expect(screen.getByTestId('signin-button')).toBeInTheDocument()
  })
})
