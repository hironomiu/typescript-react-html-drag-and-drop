import { render, screen } from '@testing-library/react'
import Cards from '../components/Cards'
import { CardType } from '../types'
describe('Cards', () => {
  const cards: CardType[] = [
    {
      id: 1,
      title: 'dummy title 1',
    },
  ]
  it('Cards', () => {
    render(<Cards title="dummy card title" cards={cards} />)
    expect(screen.getByText('dummy card title')).toBeInTheDocument()
    expect(screen.getByText('dummy title 1')).toBeInTheDocument()
  })
})
