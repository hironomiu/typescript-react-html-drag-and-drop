export type Todo = {
  id: number
  title: string
  type: number
}

export type Board = 'todo' | 'doing' | 'done'

export type Dragged = {
  id: number
  current: Board
  target: Board
}
