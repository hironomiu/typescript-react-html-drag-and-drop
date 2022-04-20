import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Todo } from '../../types'

type InitialState = {
  isAuthentication: boolean
  isCreateModalOn: boolean
  isUpdateModalOn: boolean
  cardModalData: Todo
}

const initialState: InitialState = {
  isAuthentication: false,
  isCreateModalOn: false,
  isUpdateModalOn: false,
  cardModalData: { id: 0, title: '', body: '', boardId: 0, orderId: 0 },
}

// TODO: 型
export const fetchSignIn = createAsyncThunk(
  'auth/signin',
  async (data: any) => {
    const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/auth/signin')
    const response = await fetch(url.toString(), {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        //'CSRF-Token': csrfToken
      },
      redirect: 'follow',
      body: JSON.stringify(data),
    })
    const json = await response.json()
    return { json: json }
  }
)

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
    // TODO: とりあえず作成（サーバサイドで認証を実装したらasyncThunkで再実装）
    setIsAuthentication: (state, action) => {
      state.isAuthentication = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      console.log('auth fulfilled')
    })
  },
})

export const selectIsAuthentication = (state: RootState) =>
  state.global.isAuthentication
export const selectIsCreateModalOn = (state: RootState) =>
  state.global.isCreateModalOn
export const selectIsUpdateModalOn = (state: RootState) =>
  state.global.isUpdateModalOn
export const selectCardModalData = (state: RootState) =>
  state.global.cardModalData
export const {
  setIsCreateModalOn,
  setIsUpdateModalOn,
  setCardModalData,
  setIsAuthentication,
} = globalSlice.actions
export default globalSlice.reducer
