import { CardType } from '../types'

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      id={card.id.toString()}
      key={card.id}
      draggable
      className="draggable w-[15vw] h-[20vh] bg-green-500 my-2 rounded-xl flex items-center justify-center"
    >
      <span>{card.title}</span>
    </div>
  )
}

export default Card
