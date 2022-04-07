import React from 'react'

const Cards = ({ cards }: any) => {
  return (
    <div>
      {cards.map((card: any) => (
        <div
          id={card.id.toString()}
          key={card.id}
          draggable
          className="draggable w-[15vw] h-[20vh] bg-orange-600 my-2"
        >
          {card.title}
        </div>
      ))}
    </div>
  )
}

export default Cards
