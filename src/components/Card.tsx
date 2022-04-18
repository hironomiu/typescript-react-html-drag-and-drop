import React from 'react'
import { Todo } from '../types'
import { useDispatch } from 'react-redux'
import {
  setIsUpdateModalOn,
  setCardModalData,
} from '../features/global/globalSlice'

type Props = {
  card: Todo
  dragOverCard: { cardId: number }
  setDragOverCard: React.Dispatch<
    React.SetStateAction<{
      cardId: number
    }>
  >
}

const Card = ({ card, dragOverCard, setDragOverCard }: Props) => {
  const dispatch = useDispatch()

  return (
    <>
      {card.id === dragOverCard.cardId ? (
        <div className=" border-2 w-56"></div>
      ) : null}
      <div
        id={card.id.toString()}
        key={card.id}
        draggable
        onClick={() => {
          dispatch(setCardModalData(card))
          dispatch(setIsUpdateModalOn(true))
        }}
        className="draggable w-56 h-20 bg-indigo-400 my-2 rounded-xl flex items-center justify-center hover:bg-indigo-700 hover:cursor-pointer"
        data-testid={`card-${card.id}`}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
          console.log('taraget:', e.target, e.currentTarget)

          setDragOverCard((_prev) => (_prev = { cardId: card.id }))
        }}
        onDragLeave={() => setDragOverCard((_prev) => (_prev = { cardId: 0 }))}
      >
        <span>{card.title}</span>
      </div>
    </>
  )
}

export default Card
