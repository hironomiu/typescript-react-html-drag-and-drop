import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('App', () => {
    render(<App />)
    expect(screen.getByText('todo')).toBeInTheDocument()
  })
})
