import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/board.Slice'
import todoReducer from '../features/todo/todoSlice'

export const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
