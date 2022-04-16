import { render, screen } from '@testing-library/react'
import Cards from '../components/Cards'
import { Todo } from '../types'
describe('Cards', () => {
  const cards: Todo[] = [
    {
      id: 1,
      title: 'dummy title 1',
      body: 'dummy body 1',
      boardId: 1,
      orderId: 1,
    },
  ]
  it('Cards', () => {
    const setDragOverCard = jest.fn()
    render(
      <Cards
        cards={cards}
        dragOverCard={{ cardId: 0 }}
        setDragOverCard={setDragOverCard}
      />
    )

    expect(screen.getByText('dummy title 1')).toBeInTheDocument()
  })
})
