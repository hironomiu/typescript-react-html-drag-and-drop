import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Todo } from '../../types'

type InitialState = {
  isAuthentication: boolean
  isCreateModalOn: boolean
  isUpdateModalOn: boolean
  cardModalData: Todo
  csrfToken: string
}

const initialState: InitialState = {
  isAuthentication: false,
  isCreateModalOn: false,
  isUpdateModalOn: false,
  cardModalData: { id: 0, title: '', body: '', boardId: 0, orderId: 0 },
  csrfToken: '',
}

export const fetchCsrfToken = createAsyncThunk('auth/csrf', async () => {
  const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/csrf-token')
  const response = await fetch(url.toString(), {
    method: 'GET',
    // cookie受け取る
    credentials: 'include',
  })
  const json = response.json()
  return json
})

export const fetchCheckSignIn = createAsyncThunk('auth/check', async () => {
  const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/auth/signin')
  const response = await fetch(url.toString(), {
    method: 'GET',
    // cookie受け取る
    credentials: 'include',
  })
  const json = response.json()
  return json
})

export const fetchSignIn = createAsyncThunk(
  'auth/signin',
  // TODO: 型
  async (data: any) => {
    console.log(data)
    const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/auth/signin')
    const response = await fetch(url.toString(), {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': data.csrfToken,
      },
      redirect: 'follow',
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
    const json = await response.json()
    return json
  }
)

export const fetchSignOut = createAsyncThunk(
  'auth/signout',
  async (data: any) => {
    const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/auth/signout')
    const response = await fetch(url.toString(), {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': data,
      },
      redirect: 'follow',
    })
    const json = await response.json()
    return json
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
    // TODO: 不要になったら消す
    setIsAuthentication: (state, action) => {
      state.isAuthentication = action.payload
    },
  },
  extraReducers(builder) {
    // TODO: 型
    builder.addCase(fetchSignIn.fulfilled, (state, action: any) => {
      if (action.payload.isSuccess) {
        console.log('called:', action.payload)
        state.isAuthentication = true
      }
      console.log('auth fulfilled:', action.payload, state.isAuthentication)
    })
    builder.addCase(fetchCsrfToken.fulfilled, (state, action) => {
      state.csrfToken = action.payload.csrfToken
      console.log(state.csrfToken)
    })
    builder.addCase(fetchSignOut.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload.isSuccess) {
        state.isAuthentication = false
      }
    })
    builder.addCase(fetchCheckSignIn.fulfilled, (state, action) => {
      if (action.payload.isSuccess) {
        state.isAuthentication = true
      }
      console.log('check signin:', action.payload)
    })
  },
})

export const selectCsrfToken = (state: RootState) => state.global.csrfToken
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
