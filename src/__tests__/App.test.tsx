import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { setupServer } from 'msw/node'
import { handlers } from '../handlers'
import userEvent from '@testing-library/user-event'

process.env.REACT_APP_API_URL = 'http://localhost:8888'

const server = setupServer(...handlers)

beforeEach(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('App', () => {
  it('App', async () => {
    render(<App />)
    expect(screen.getByTestId('signin-button')).toBeInTheDocument()
    screen.debug()
    userEvent.click(screen.getByTestId('profile'))
    expect(await screen.findByText('Profile')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('top-button'))
    // TODO: Error: Cross origin http://localhost forbidden
    // expect(screen.getByText('todo')).toBeInTheDocument()
  })
})
