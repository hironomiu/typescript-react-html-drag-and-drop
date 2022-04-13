import React from 'react'
import Cards from './Cards'
import { Todo } from '../types'

// TODO: propsを綺麗にする
const Board = ({
  board,
  setBoards,
  todos,
  // setTodos,
  // dragged,
  // setDragged,
  isTodo,
  setIsTodo,
  isDoing,
  // setIsDoing,
  isDone,
  // setIsDone,
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
  setBoards: React.Dispatch<
    React.SetStateAction<
      {
        id: number
        title: string
        isActive: boolean
      }[]
    >
  >
  todos: Todo[]
  isTodo: boolean
  isDoing: boolean
  isDone: boolean
  setIsTodo: React.Dispatch<React.SetStateAction<boolean>>
  handleOnDrag: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragEnd: () => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleOnLeave: () => void
}) => {
  const styleMain =
    'w-72 h-[80vh] mx-4 flex flex-col wjustify-center items-center rounded-xl overflow-y-auto'
  const styleActive = 'bg-blue-500'
  const styleInactive = 'bg-blue-300'

  return (
    <div
      className={
        (board.title === 'todo' && isTodo) ||
        (board.title === 'doing' && isDoing) ||
        (board.title === 'done' && isDone)
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
        cards={todos.filter((todo: Todo) => todo.type === board.id)}
      />
    </div>
  )
}

export default Board
