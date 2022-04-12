import { render, screen } from '@testing-library/react'
import Cards from '../components/Cards'
import { Todo } from '../types'
describe('Cards', () => {
  const cards: Todo[] = [
    {
      id: 1,
      title: 'dummy title 1',
      type: 1,
    },
  ]
  it('Cards', () => {
    render(<Cards title="dummy card title" cards={cards} />)
    expect(screen.getByText('dummy card title')).toBeInTheDocument()
    expect(screen.getByText('dummy title 1')).toBeInTheDocument()
  })
})
