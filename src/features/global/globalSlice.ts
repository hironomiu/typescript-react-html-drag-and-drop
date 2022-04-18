import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Todo } from '../../types'

type InitialState = {
  isModalOn: boolean
  cardModalData: Todo
}

const initialState: InitialState = {
  isModalOn: false,
  cardModalData: { id: 0, title: '', body: '', boardId: 0, orderId: 0 },
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsModalOn: (state, action) => {
      state.isModalOn = action.payload
    },
    // TODO: このstateの格納先はここが良いかtodoSliceが良いか考える
    setCardModalData: (state, action) => {
      state.cardModalData = action.payload
    },
  },
})

export const selectIsModalOn = (state: RootState) => state.global.isModalOn
export const selectCardModalData = (state: RootState) =>
  state.global.cardModalData
export const { setIsModalOn, setCardModalData } = globalSlice.actions
export default globalSlice.reducer
