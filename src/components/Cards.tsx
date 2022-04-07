import React from 'react'
import Card from './Card'

// TODO 型
const Cards = ({ cards }: any) => {
  return (
    <>
      {
        // TODO 型
        cards.map((card: any) => (
          <Card key={card.id} card={card} />
        ))
      }
    </>
  )
}

export default Cards
