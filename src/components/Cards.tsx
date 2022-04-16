import Card from './Card'
import { Todo } from '../types'

type Props = {
  cards: Todo[]
  setDragOverCard: React.Dispatch<
    React.SetStateAction<{
      cardId: number
    }>
  >
}

const Cards = ({ cards, setDragOverCard }: Props) => {
  return (
    <>
      {cards.map((card: Todo) => (
        <Card key={card.id} card={card} setDragOverCard={setDragOverCard} />
      ))}
    </>
  )
}

export default Cards
