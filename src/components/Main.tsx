import { useState } from 'react'
import Board from './Board'
import { useSelector, useDispatch } from 'react-redux'
import { selectBoards } from '../features/board/board.Slice'
import { selectTodos, addTodo } from '../features/todo/todoSlice'
import { Dragged } from '../types'

const Main = () => {
  const dispatch = useDispatch()
  const boards = useSelector(selectBoards)
  const todos = useSelector(selectTodos)

  // TODO: グローバルで持つか？
  const [dragged, setDragged] = useState<Dragged>({
    id: 0,
    current: 'todo',
    target: 'todo',
  })
  // TODO: グローバルで持つか？
  // TODO: カード同士の入れかで使う
  const [dragOverCard, setDragOverCard] = useState<{ cardId: number }>({
    cardId: 0,
  })

  const handleClick = () => {
    // APIから取得するまでArray内のidの最大値を取得し+1しセット
    // TODO: 将来的にはtodoの箇所をtodoをカラムとしidで引けるようにする
    const maxId = Math.max(...todos.map((todo) => todo.id)) | 0
    const maxOrderId =
      Math.max(
        ...todos
          .filter((todo) => todo.boardId === 1)
          .map((todo) => todo.orderId)
      ) | 0

    dispatch(
      addTodo({
        id: maxId + 1,
        title: `task title${maxId + 1}`,
        body: `task body${maxId + 1}`,
        boardId: 1,
        orderId: maxOrderId + 1,
      })
    )
  }

  return (
    <div className="flex w-scree">
      <div className="flex m-8">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            dragged={dragged}
            setDragged={setDragged}
            dragOverCard={dragOverCard}
            setDragOverCard={setDragOverCard}
          />
        ))}
      </div>
      <div className="flex m-8">
        <button
          className=" border-0 h-12 w-56 rounded-xl bg-pink-200 hover:bg-pink-400"
          onClick={handleClick}
          data-testid="card-create-button"
        >
          Card Create
        </button>
      </div>
    </div>
  )
}

export default Main
