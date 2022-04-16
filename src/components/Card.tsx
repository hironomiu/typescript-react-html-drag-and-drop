import { Todo } from '../types'

type Props = { card: Todo }

const Card = ({ card }: Props) => {
  return (
    <div
      id={card.id.toString()}
      key={card.id}
      draggable
      onClick={() => alert('clicked:' + card.id + card.body)}
      className="draggable w-56 h-20 bg-indigo-400 my-2 rounded-xl flex items-center justify-center hover:bg-indigo-700 hover:cursor-pointer"
      data-testid={`card-${card.id}`}
    >
      <span>{card.title}</span>
    </div>
  )
}

export default Card
