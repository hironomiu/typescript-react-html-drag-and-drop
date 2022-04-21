import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { BoardType } from '../../types'

type InitialState = {
  boards: BoardType[]
}
const initialState: InitialState = {
  boards: [],
}

export const fetchBoards = createAsyncThunk('boards/fetch', async () => {
  const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/boards')
  const response = await fetch(url.toString(), {
    method: 'GET',
    // 認証を通すためcookieを渡す
    credentials: 'include',
  })
  const data = await response.json()
  return data
})

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
  extraReducers(builder) {
    builder.addCase(fetchBoards.pending, (state) => {
      console.log('loading')
    })
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      // MEMO: isActiveはboardにドラッグオーバーしてる状態を管理（DBでは持っていない）
      state.boards = action.payload.map((data: any) => ({
        id: data.id,
        title: data.title,
        isActive: false,
      }))
    })
  },
})

export const selectBoards = (state: RootState) => state.board.boards
export const { setBoards, setBoardIsActive, setAllBoardIsActiveFlase } =
  boardSlice.actions
export default boardSlice.reducer
