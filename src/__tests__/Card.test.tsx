import { render, screen } from '@testing-library/react'
import Card from '../components/Card'

describe('Card', () => {
  it('Card', () => {
    const setDragOverCard = jest.fn()
    render(
      <Card
        card={{
          id: 1,
          title: 'dummy title',
          body: 'dummy body 1',
          boardId: 1,
          orderId: 1,
        }}
        setDragOverCard={setDragOverCard}
      />
    )
    expect(screen.getByText('dummy title')).toBeInTheDocument()
  })
})
