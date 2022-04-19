import { render, screen } from '@testing-library/react'
import Card from '../components/Card'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import boardReducer from '../features/board/board.Slice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer from '../features/global/globalSlice'

const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
    global: globalReducer,
  },
})

describe('Card', () => {
  it('Card', () => {
    const setDragOverCard = jest.fn()
    render(
      <Provider store={store}>
        <Card
          card={{
            id: 1,
            title: 'dummy title',
            body: 'dummy body 1',
            boardId: 1,
            orderId: 1,
          }}
          dragOverCard={{ cardId: 0, orderId: 0 }}
          setDragOverCard={setDragOverCard}
        />
      </Provider>
    )
    expect(screen.getByText('dummy title')).toBeInTheDocument()
  })
})
