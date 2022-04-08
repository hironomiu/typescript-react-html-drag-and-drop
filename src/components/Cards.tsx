import Card from './Card'
import { CardType } from '../types'

const Cards = ({ title, cards }: { title: string; cards: CardType[] }) => {
  return (
    <div className="my-4 flex flex-col items-center">
      <span className="font-bold">{title}</span>
      {cards.map((card: CardType) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

export default Cards
