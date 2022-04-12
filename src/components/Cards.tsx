import Card from './Card'
import { Todo } from '../types'

const Cards = ({ title, cards }: { title: string; cards: Todo[] }) => {
  return (
    <div className="my-4 flex flex-col items-center">
      <span className="font-bold">{title}</span>
      {cards.map((card: Todo) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

export default Cards
