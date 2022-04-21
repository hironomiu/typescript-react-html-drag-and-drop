import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsCreateModalOn,
  setIsUpdateModalOn,
  selectCardModalData,
  setCardModalData,
  selectCsrfToken,
} from '../../features/global/globalSlice'
import { selectBoards } from '../../features/board/boardSlice'
import { fetchUpdateTodo, fetchCreateTodo } from '../../features/todo/todoSlice'
import { AppDispatch } from '../../app/store'

const CardModal = ({ mode }: { mode: 'update' | 'create' }) => {
  const ref = useRef<HTMLInputElement>(null!)
  useEffect(() => {
    ref.current.focus()
  }, [])

  const dispatch = useDispatch<AppDispatch>()
  const cardModalData = useSelector(selectCardModalData)
  const csrfToken = useSelector(selectCsrfToken)
  const boards = useSelector(selectBoards)
  // title
  const [title, setTitle] = useState<string>(() => cardModalData.title)
  // body
  const [body, setBody] = useState<string>(() => cardModalData.body)
  // board
  const [board, setBoard] = useState<number>(() => cardModalData.boardId)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle((_prev) => (_prev = e.target.value))
  }
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody((_prev) => (_prev = e.target.value))
  }
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBoard(Number(e.target.value))
  }

  // TODO: boardIdを変更した際の新しいboardでの並び順
  const handleClick = () => {
    console.log('called:', mode)
    if (mode === 'create') {
      dispatch(
        fetchCreateTodo({
          id: 0,
          title: title,
          body: body,
          boardId: board,
          orderId: 0,
          csrfToken: csrfToken,
        })
      )
      dispatch(setIsCreateModalOn(false))
    } else if (mode === 'update') {
      dispatch(
        fetchUpdateTodo({
          id: cardModalData.id,
          title: title,
          body: body,
          boardId: board,
          orderId: cardModalData.orderId,
          csrfToken: csrfToken,
        })
      )
      dispatch(setIsUpdateModalOn(false))
    }
    setCardModalData({
      id: 0,
      title: '',
      body: '',
      boardId: 0,
      orderId: 0,
    })
    setTitle('')
    setBody('')
  }

  const handleCloseClick = () => {
    if (mode === 'create') dispatch(setIsCreateModalOn(false))
    if (mode === 'update') dispatch(setIsUpdateModalOn(false))
    setCardModalData({
      id: 0,
      title: '',
      body: '',
      boardId: 0,
      orderId: 0,
    })
    setTitle('')
    setBody('')
  }

  return (
    <>
      <div
        onClick={handleCloseClick}
        className="absolute inset-0 bg-black opacity-50"
      />
      <div className="absolute bottom-[10%] left-1/3 px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div
          onClick={handleCloseClick}
          className="bg-black opacity-0 w-full h-full absolute z-10 inset-0"
        />
        <div className="bg-blue-100 rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-start w-96 h-72">
            <div className="mt-4 md:mt-0 md:mx-6 text-center md:text-left w-screen">
              <p className="font-bold text-2xl text-blue-900">Your Todo</p>
              <p className="text-sm text-gray-700 mt-1">
                <input
                  className="w-full h-8 p-2"
                  type="text"
                  value={title}
                  onChange={handleInputChange}
                  data-testid="title-input"
                  ref={ref}
                />
              </p>
              <p className="text-sm text-gray-700 mt-4">
                <textarea
                  className="w-full h-40 p-2"
                  value={body}
                  onChange={handleTextAreaChange}
                  data-testid="body-textarea"
                />
              </p>
              <select
                className="mt-2 p-2"
                value={board}
                onChange={handleChange}
              >
                <option key={0} value="0">
                  Select Progress
                </option>
                {boards.map((board) => (
                  <option
                    key={board.id}
                    data-testid={`select-option-${board.id}`}
                    value={board.id}
                  >
                    {board.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              onClick={handleClick}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 disabled:bg-white disabled:text-gray-200 hover:bg-blue-400 bg-blue-200 text-blue-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              data-testid="card-modal-create-and-update-button"
              disabled={title === '' || body === '' || board === 0}
            >
              {mode === 'create' ? 'Create' : 'Update'}
            </button>
            <button
              onClick={handleCloseClick}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 hover:bg-gray-400 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
              data-testid="card-modal-close-button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardModal
