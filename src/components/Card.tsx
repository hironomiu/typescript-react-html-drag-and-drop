import { Todo } from '../types'

type Props = {
  card: Todo
  setDragOverCard: React.Dispatch<
    React.SetStateAction<{
      cardId: number
    }>
  >
}

const Card = ({ card, setDragOverCard }: Props) => {
  return (
    <div
      id={card.id.toString()}
      key={card.id}
      draggable
      onClick={() => alert('clicked:' + card.id + card.body)}
      className="draggable w-56 h-20 bg-indigo-400 my-2 rounded-xl flex items-center justify-center hover:bg-indigo-700 hover:cursor-pointer"
      data-testid={`card-${card.id}`}
      onDragOver={() =>
        setDragOverCard((_prev) => (_prev = { cardId: card.id }))
      }
      onDragLeave={() => setDragOverCard((_prev) => (_prev = { cardId: 0 }))}
    >
      <span>{card.title}</span>
    </div>
  )
}

export default Card
