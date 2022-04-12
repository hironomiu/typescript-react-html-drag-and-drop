import { useState } from 'react'
import { Todo, Dragged } from '../types'

export const useMain = () => {
  const [todos, setTodos] = useState<Todo[] | []>(() => [
    { id: 1, title: 'todo title1', type: 1 },
    { id: 2, title: 'todo title2', type: 1 },
    { id: 3, title: 'todo title3', type: 1 },
  ])
  const [dragged, setDragged] = useState<Dragged>({
    id: 0,
    current: 'todo',
    target: 'todo',
  })

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
  }
}
