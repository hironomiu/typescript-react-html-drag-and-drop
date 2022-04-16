import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Todo } from '../../types'

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
      console.log('setTodos:', action.payload)
      state.todos = action.payload
    },
    setTodoBoardId: (state, action) => {
      console.log('setTodoBoardId:', action.payload)
      const card = {
        ...(state.todos.find(
          (todo) => todo.id === action.payload.dragged.id
        ) as Todo),
      }
      card.boardId = action.payload.id
      const newTodos = [...state.todos.filter((todo) => todo.id !== card.id)]
      newTodos.push(card)
      // TODO: ソートする（下は過去の実装をもってきている）
      // let resultTodos: Todo[] = []

      // boards.forEach((board) => {
      //   const newTodos = todos.filter((todo) => todo.boardId === board.id)
      //   const sorttedTodos: Todo[] = newTodos.map((todo: Todo, index) => ({
      //     ...todo,
      //     orderId: index + 1,
      //   }))
      //   resultTodos = [...resultTodos, ...sorttedTodos]
      // })

      state.todos = [...newTodos]
    },
    // TODO: 将来的にはAPI叩くのでThunkで実装する
    addTodo: (state, action) => {
      console.log(action.payload)
      state.todos.push(action.payload)
    },
  },
})

export const selectTodos = (state: RootState) => state.todo.todos
export const { setTodos, setTodoBoardId, addTodo } = todoSlice.actions
export default todoSlice.reducer