import Card from './Card'
import { CardType } from '../types'

const Cards = ({ cards }: { cards: CardType[] }) => {
  return (
    <>
      {cards.map((card: CardType) => (
        <Card key={card.id} card={card} />
      ))}
    </>
  )
}

export default Cards
