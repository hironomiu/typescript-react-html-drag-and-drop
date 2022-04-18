import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { BoardType, Todo } from '../../types'
import { Dispatch } from 'redux'

type InitialState = {
  todos: Todo[]
}
const initialState: InitialState = {
  // TODO: とりあえず設定、どっかでThunkで取得するよう変更する

  todos: [
    { id: 1, title: 'task title1', body: 'task body1', boardId: 1, orderId: 1 },
    { id: 2, title: 'task title2', body: 'task body2', boardId: 1, orderId: 2 },
    { id: 3, title: 'task title3', body: 'task body3', boardId: 1, orderId: 3 },
    { id: 4, title: 'task title4', body: 'task body4', boardId: 1, orderId: 4 },
  ],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    // TODO: actionにboardsを設定しているが直接boardSliceを参照可能ならそっちから参照する
    setTodoBoardId: (state, action) => {
      const card = state.todos.find(
        (t) => t.id === action.payload.dragged.id
      ) as Todo
      card.boardId = action.payload.id
      const tmpTodos = [...state.todos.filter((t) => t.id !== card.id)]
      tmpTodos.push(card)

      // ソート処理
      // TODO: sortTodosに抜き出す
      const resultTodos: Todo[] = [] as Todo[]

      action.payload.boards.forEach((board: BoardType) => {
        const beforeTodos = tmpTodos.filter((t) => t.boardId === board.id)
        const sortedTodos = beforeTodos.map((t, i) => {
          t.orderId = i + 1
          return { ...t }
        }) as Todo[]
        resultTodos.push(...sortedTodos)
      })

      state.todos = resultTodos
    },
    // TODO: 上下のソートを抜き出す
    sortTodos: (state, action) => {},
    // TODO: 将来的にはAPI叩くのでasync Thunkで実装する
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    swapTodo: (state, action) => {
      const target = state.todos.find((t) => t.id === action.payload.id) as Todo
      const dragOverCard = state.todos.find(
        (t) => t.id === action.payload.dragOverCardId
      ) as Todo
      const tmpTodos = state.todos.filter((t) => t.id !== action.payload.id)

      const index = tmpTodos.findIndex(
        (t) => t.id === action.payload.dragOverCardId
      )
      target.orderId < dragOverCard.orderId
        ? tmpTodos.splice(index + 1, 0, target)
        : tmpTodos.splice(index, 0, target)

      // ソート処理
      // TODO: sortTodosに抜き出す
      const resultTodos: Todo[] = [] as Todo[]

      action.payload.boards.forEach((board: BoardType) => {
        const beforeTodos = tmpTodos.filter((t) => t.boardId === board.id)
        const sortedTodos = beforeTodos.map((t, i) => {
          t.orderId = i + 1
          return { ...t }
        }) as Todo[]
        resultTodos.push(...sortedTodos)
      })

      state.todos = resultTodos
    },
    // TODO: 一旦仮で実装（本来はAPIを叩くのでasyncThunkで処理させる）
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      )
      const newTodos = [...state.todos]
      newTodos[index] = { ...action.payload }

      state.todos = newTodos
    },
  },
})

export const selectTodos = (state: RootState) => state.todo.todos

// TODO: 型 & 実装
export const swapTodoXXX =
  ({ dradragOverCardId, id, boards }: any) =>
  (dispatch: Dispatch, getState: any) => {
    const todos = selectTodos(getState())
    if (dradragOverCardId > 0 && dradragOverCardId !== id) {
      const target = {
        ...todos.find((todo: Todo) => todo.id === id),
      } as Todo
      const dradragOverCard = {
        ...todos.find((todo: Todo) => todo.id === dradragOverCardId),
      } as Todo
      const newTodos = [...todos.filter((todo: Todo) => todo.id !== id)]
      const index = newTodos.findIndex((todo) => todo.id === dradragOverCardId)
      if (target.orderId < dradragOverCard.orderId) {
        console.log('big')
        newTodos.splice(index + 1, 0, target)
      } else {
        newTodos.splice(index, 0, target)
      }

      console.log('swapTodo:', target, index)
      dispatch(sortTodos({ newTodos, boards }))
    }
  }

export const {
  setTodos,
  setTodoBoardId,
  addTodo,
  swapTodo,
  sortTodos,
  updateTodo,
} = todoSlice.actions
export default todoSlice.reducer
