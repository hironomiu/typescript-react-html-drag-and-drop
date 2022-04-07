import React from 'react'

const Card = ({ card }: any) => {
  return (
    <div
      id={card.id.toString()}
      key={card.id}
      draggable
      className="draggable w-[15vw] h-[20vh] bg-orange-600 my-2"
    >
      {card.title}
    </div>
  )
}

export default Card
