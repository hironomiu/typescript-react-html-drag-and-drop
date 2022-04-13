import { render, screen } from '@testing-library/react'
import Main from '../components/Main'

describe('Main', () => {
  it('Main', () => {
    render(<Main />)
    expect(screen.getByText(/todo/)).toBeInTheDocument()
    expect(screen.getByText(/doing/)).toBeInTheDocument()
    expect(screen.getByText(/done/)).toBeInTheDocument()
  })
})
