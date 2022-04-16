import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/board.Slice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer from '../features/global/globalSlice'

export const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
    global: globalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
