import { render, screen } from '@testing-library/react'
import Main from '../components/Main'

describe('Main', () => {
  it('Main', () => {
    render(<Main />)
    expect(screen.getByText(/ToDo/)).toBeInTheDocument()
    expect(screen.getByText(/Doing/)).toBeInTheDocument()
    expect(screen.getByText(/Done/)).toBeInTheDocument()
  })
})
