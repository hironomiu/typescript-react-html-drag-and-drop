import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { BoardType } from '../../types'

type InitialState = {
  boards: BoardType[]
}
const initialState: InitialState = {
  // TODO: 仮で設定 -> どっかでダミーのThunk化にする（その後サーバサイド実装）
  boards: [
    // id = Todo.type
    { id: 1, title: 'todo', isActive: false },
    { id: 2, title: 'doing', isActive: false },
    { id: 3, title: 'done', isActive: false },
  ],
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload
    },
    setBoardIsActive: (state, action) => {
      const index = state.boards.findIndex(
        (board) => board.id === action.payload.id
      )
      state.boards[index].isActive = action.payload.isActive
    },
    setAllBoardIsActiveFlase: (state) => {
      state.boards = state.boards.map((board) => {
        board.isActive = false
        return board
      })
    },
  },
})

export const selectBoards = (state: RootState) => state.board.boards
export const { setBoards, setBoardIsActive, setAllBoardIsActiveFlase } =
  boardSlice.actions
export default boardSlice.reducer
