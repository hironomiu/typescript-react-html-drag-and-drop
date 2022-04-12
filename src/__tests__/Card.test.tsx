import { render, screen } from '@testing-library/react'
import Card from '../components/Card'

describe('Card', () => {
  it('Card', () => {
    render(<Card card={{ id: 1, title: 'dummy title', type: 1 }} />)
    expect(screen.getByText('dummy title')).toBeInTheDocument()
  })
})
