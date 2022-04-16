import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsModalOn,
  selectCardModalData,
} from '../../features/global/globalSlice'
const CardModal = () => {
  const dispatch = useDispatch()
  const cardModalData = useSelector(selectCardModalData)

  useEffect(() => {})
  return (
    <Fragment>
      <div
        onClick={() => dispatch(setIsModalOn(false))}
        className="absolute inset-0 bg-black opacity-50"
      />
      <div className="absolute bottom-[10%] left-1/3 px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div
          onClick={() => dispatch(setIsModalOn(false))}
          className="bg-black opacity-0 w-full h-full absolute z-10 inset-0"
        />
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-start w-96 h-64">
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left w-screen">
              <p className="font-bold text-2xl">Your Todo</p>
              <p className="text-sm text-gray-700 mt-1">
                {cardModalData.title}
              </p>
              <p className="text-sm text-gray-700 mt-1">{cardModalData.body}</p>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              onClick={() => dispatch(setIsModalOn(false))}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-blue-200 text-blue-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            >
              Update
            </button>
            <button
              onClick={() => dispatch(setIsModalOn(false))}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CardModal
