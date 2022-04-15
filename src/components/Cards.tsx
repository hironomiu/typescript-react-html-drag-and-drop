import Card from './Card'
import { Todo } from '../types'

type Props = { title: string; cards: Todo[] }

const Cards = ({ title, cards }: Props) => {
  return (
    <div className="my-4 flex flex-col items-center">
      <span className="font-bold mb-4">{title}</span>
      {cards.map((card: Todo) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

export default Cards
