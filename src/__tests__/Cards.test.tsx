import { render, screen } from '@testing-library/react'
import Cards from '../components/Cards'
import { Todo } from '../types'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/boardSlice'
import todoReducer from '../features/todo/todoSlice'
import globalReducer from '../features/global/globalSlice'

const store = configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer,
    global: globalReducer,
  },
})

describe('Cards', () => {
  const cards: Todo[] = [
    {
      id: 1,
      title: 'dummy title 1',
      body: 'dummy body 1',
      boardId: 1,
      orderId: 1,
    },
  ]
  it('Cards', () => {
    const setDragOverCard = jest.fn()
    render(
      <Provider store={store}>
        <Cards
          cards={cards}
          dragOverCard={{ cardId: 0, orderId: 0 }}
          setDragOverCard={setDragOverCard}
        />
      </Provider>
    )

    expect(screen.getByText('dummy title 1')).toBeInTheDocument()
  })
})
