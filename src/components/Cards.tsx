import Card from './Card'
import { Todo } from '../types'

type Props = {
  cards: Todo[]
  dragOverCard: { cardId: number }
  setDragOverCard: React.Dispatch<
    React.SetStateAction<{
      cardId: number
    }>
  >
}

const Cards = ({ cards, dragOverCard, setDragOverCard }: Props) => {
  return (
    <>
      {cards.map((card: Todo) => (
        <Card
          key={card.id}
          card={card}
          dragOverCard={dragOverCard}
          setDragOverCard={setDragOverCard}
        />
      ))}
    </>
  )
}

export default Cards
