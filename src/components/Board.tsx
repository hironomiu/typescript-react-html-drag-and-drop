import React from 'react'
import Cards from './Cards'
import { Todo } from '../types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectTodos,
  setTodoBoardId,
  swapTodo,
} from '../features/todo/todoSlice'
import {
  selectBoards,
  setAllBoardIsActiveFlase,
  setBoardIsActive,
} from '../features/board/board.Slice'
import { BoardType, Dragged } from '../types'

type Props = {
  board: BoardType
  dragged: Dragged
  setDragged: React.Dispatch<React.SetStateAction<Dragged>>
  dragOverCard: { cardId: number }
  setDragOverCard: React.Dispatch<React.SetStateAction<{ cardId: number }>>
}

const Board = ({
  board,
  dragged,
  dragOverCard,
  setDragOverCard,
  setDragged,
}: Props) => {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const boards = useSelector(selectBoards)
  const styleMain =
    'w-64 h-[80vh] mx-4 flex flex-col wjustify-center items-center rounded-xl overflow-y-auto'
  const styleActive = 'bg-blue-500'
  const styleInactive = 'bg-blue-300'

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('on drag:', e.currentTarget.className.split(' ')[0])
    // TODO: currentをboards.titleにユニオン型で縛る（現状はstring）
    const current = e.currentTarget.className.split(' ')[0]
    if (boards.some((board: BoardType) => board.title === current))
      setDragged((_prev) => ({
        ..._prev,
        id: Number((e.target as HTMLDivElement).id),
        current: current,
      }))
  }

  const handleDragEnd = () => {
    // TODO: 違うBoard、同じBoardで処理を分けているが可能なら同じReducerでまとめる
    if (dragged.current !== dragged.target) {
      console.log('drag end:', dragged.current, dragged.target)
      const board = boards.find(
        (board) => board.title === dragged.target
      ) as BoardType
      dispatch(setTodoBoardId({ id: board.id, dragged, boards: boards }))
    } else {
      // TODO: board内の要素の入れ替えをここに実装する
      console.log('drag end else!!!!!!!:', dragged, dragOverCard)
      if (dragOverCard.cardId > 0 && dragOverCard.cardId !== dragged.id) {
        dispatch(
          swapTodo({
            id: dragged.id,
            dragOverCardId: dragOverCard.cardId,
            boards: boards,
          })
        )
      }
    }
    setDragged({ id: 0, current: 'todo', target: 'todo' })
    setDragOverCard({ cardId: 0 })
    dispatch(setAllBoardIsActiveFlase())
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // preventDefaultをすることでCardの動きがcurrentに戻る動作（戻ってからtargetに配置される）を防ぐ
    e.preventDefault()
    // TODO: currentを'todo' | 'doing' | 'done'に縛る方法（現状はstring）
    const current = e.currentTarget.className.split(' ')[0]
    console.log('drag over:', current, e.screenX, e.screenY)

    // TODO: boardsを使ってcurrentと付き合わせる
    if (current === 'todo' || current === 'doing' || current === 'done') {
      setDragged((_prev) => ({ ..._prev, target: current }))
    }

    if (boards.filter((board: BoardType) => board.title === current)) {
      const board = boards.filter(
        (board: BoardType) => board.title === current
      )[0]
      dispatch(setBoardIsActive({ id: board.id, isActive: true }))
    }
  }

  const handleOnLeave = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(`${e.currentTarget.className.split(' ')[0]} drag leave`)
    const current = e.currentTarget.className.split(' ')[0]
    const board = boards.filter(
      (board: BoardType) => board.title === current
    )[0]
    dispatch(setBoardIsActive({ id: board.id, isActive: false }))
  }

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
      <div className="my-4 flex flex-col items-center">
        <span className="font-bold mb-4 text-2xl text-blue-900">
          {board.title}
        </span>
        <Cards
          cards={todos.filter((todo: Todo) => todo.boardId === board.id)}
          dragOverCard={dragOverCard}
          setDragOverCard={setDragOverCard}
        />
      </div>
    </div>
  )
}

export default Board
