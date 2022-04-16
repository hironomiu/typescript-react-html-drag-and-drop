import React from 'react'
import Cards from './Cards'
import { Todo } from '../types'
import { useSelector } from 'react-redux'
import { selectTodos } from '../features/todo/todoSlice'

// TODO: propsを綺麗にする
const Board = ({
  board,
  handleOnDrag,
  handleDragEnd,
  handleDragOver,
  handleOnLeave,
}: {
  board: {
    id: number
    title: string
    isActive: boolean
  }
  handleOnDrag: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragEnd: () => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleOnLeave: (e: React.DragEvent<HTMLDivElement>) => void
}) => {
  const todos = useSelector(selectTodos)
  const styleMain =
    'w-64 h-[80vh] mx-4 flex flex-col wjustify-center items-center rounded-xl overflow-y-auto'
  const styleActive = 'bg-blue-500'
  const styleInactive = 'bg-blue-300'

  return (
    <div
      className={
        board.isActive
          ? `${board.title} ${styleMain} ${styleActive}`
          : `${board.title} ${styleMain} ${styleInactive}`
      }
      onDrag={handleOnDrag}
      // onDragStart={() => console.log(`${board.title} drag start`)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      // onDrop={() => console.log(`${board.title} on drop`)}
      onDragLeave={handleOnLeave}
      // onDragEnter={() => console.log(`${board.title} drag enter`)}
    >
      <Cards
        title={board.title}
        cards={todos.filter((todo: Todo) => todo.boardId === board.id)}
      />
    </div>
  )
}

export default Board
