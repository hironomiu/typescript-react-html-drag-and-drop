export type Todo = {
  id: number
  title: string
  body: string
  boardId: number
  orderId: number
}

// TODO: 型、将来的にBoardを可変にした際に以下のような列挙型でいけるか考える
// export type Board = 'todo' | 'doing' | 'done'

export type Dragged = {
  id: number
  current: string
  target: string
  // current: Board
  // target: Board
}

export type BoardType = { id: number; title: string; isActive: boolean }
