import { useState } from 'react'
import { Todo, Dragged, BoardType } from '../types'

export const useMain = () => {
  const [todos, setTodos] = useState<Todo[] | []>(() => [
    { id: 4, title: 'task title4', body: 'task body4', boardId: 1, orderId: 1 },
    { id: 1, title: 'task title1', body: 'task body1', boardId: 1, orderId: 2 },
    { id: 2, title: 'task title2', body: 'task body2', boardId: 2, orderId: 1 },
    { id: 3, title: 'task title3', body: 'task body3', boardId: 2, orderId: 2 },
  ])
  const [dragged, setDragged] = useState<Dragged>({
    id: 0,
    current: 'todo',
    target: 'todo',
  })

  // id = Todo.type
  const [boards, setBoards] = useState<BoardType[]>(() => [
    { id: 1, title: 'todo', isActive: false },
    { id: 2, title: 'doing', isActive: false },
    { id: 3, title: 'done', isActive: false },
  ])
  const [isTodo, setIsTodo] = useState<boolean>(false)
  const [isDoing, setIsDoing] = useState<boolean>(false)
  const [isDone, setIsDone] = useState<boolean>(false)

  return {
    todos,
    setTodos,
    dragged,
    setDragged,
    isTodo,
    setIsTodo,
    isDoing,
    setIsDoing,
    isDone,
    setIsDone,
    boards,
    setBoards,
  }
}
