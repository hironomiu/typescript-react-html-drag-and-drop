import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { BoardType, Todo } from '../../types'

type InitialState = {
  todos: Todo[]
}
const initialState: InitialState = {
  // TODO: とりあえず設定、どっかでThunkで取得するよう変更する

  todos: [
    // { id: 1, title: 'task title1', body: 'task body1', boardId: 1, orderId: 1 },
    // { id: 2, title: 'task title2', body: 'task body2', boardId: 1, orderId: 2 },
    // { id: 3, title: 'task title3', body: 'task body3', boardId: 1, orderId: 3 },
    // { id: 4, title: 'task title4', body: 'task body4', boardId: 1, orderId: 4 },
  ],
}

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/todos')
  const response = await fetch(url.toString())
  const data = await response.json()
  return data
})

export const fetchCreateTodo = createAsyncThunk(
  'todos/create',
  async (data: Todo) => {
    console.log('fetchUpdateTodo:', data)
    const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/todos')
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

export const fetchUpdateTodo = createAsyncThunk(
  'todo/update',
  async (data: Todo) => {
    console.log('fetchUpdateTodo:', data)
    const url = new URL(process.env.REACT_APP_API_URL + '/api/v1/todos')
    const response = await fetch(url.toString(), {
      method: 'PUT',
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
    return { json: json, data: data }
  }
)

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
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending, (state) => {
      console.log('loading')
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload.map(
        (data: {
          id: number
          title: string
          body: string
          board_id: number
          order_id: number
        }) => ({
          id: data.id,
          title: data.title,
          body: data.body,
          boardId: data.board_id,
          orderId: data.order_id,
        })
      )
    })
    builder.addCase(fetchUpdateTodo.pending, (state, action) => {
      console.log('fetchUpdateTodo loading')
    })
    builder.addCase(fetchUpdateTodo.fulfilled, (state, action) => {
      // TODO: updateTodoと全く同じなのでまとめる
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.data.id
      )
      const newTodos = [...state.todos]
      newTodos[index] = { ...action.payload.data }

      state.todos = newTodos
    })
    builder.addCase(fetchCreateTodo.fulfilled, (state, action) => {
      console.log('finish:', action.payload)
      state.todos.push({
        id: action.payload.json.data.id,
        title: action.payload.json.data.title,
        body: action.payload.json.data.body,
        boardId: action.payload.json.data.board_id,
        orderId: action.payload.json.data.order_id,
      })
    })
  },
})

export const selectTodos = (state: RootState) => state.todo.todos

export const {
  setTodos,
  setTodoBoardId,
  addTodo,
  swapTodo,
  sortTodos,
  updateTodo,
} = todoSlice.actions
export default todoSlice.reducer
