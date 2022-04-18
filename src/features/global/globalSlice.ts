import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Todo } from '../../types'

type InitialState = {
  isCreateModalOn: boolean
  isUpdateModalOn: boolean
  cardModalData: Todo
}

const initialState: InitialState = {
  isCreateModalOn: false,
  isUpdateModalOn: false,
  cardModalData: { id: 0, title: '', body: '', boardId: 0, orderId: 0 },
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // TODOの作成処理用モーダル出力制御
    setIsCreateModalOn: (state, action) => {
      state.isCreateModalOn = action.payload as boolean
    },
    // TODOの更新処理用モーダル出力制御
    setIsUpdateModalOn: (state, action) => {
      state.isUpdateModalOn = action.payload as boolean
    },
    // TODO: このstateの格納先はここが良いかtodoSliceが良いか考える
    setCardModalData: (state, action) => {
      state.cardModalData = action.payload
    },
  },
})

export const selectIsCreateModalOn = (state: RootState) =>
  state.global.isCreateModalOn
export const selectIsUpdateModalOn = (state: RootState) =>
  state.global.isUpdateModalOn
export const selectCardModalData = (state: RootState) =>
  state.global.cardModalData
export const { setIsCreateModalOn, setIsUpdateModalOn, setCardModalData } =
  globalSlice.actions
export default globalSlice.reducer
