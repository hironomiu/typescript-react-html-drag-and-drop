import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import {
  selectCsrfToken,
  fetchSignOut,
  setIsSignOutModalOn,
} from '../../features/global/globalSlice'

const SignOutModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const csrfToken = useSelector(selectCsrfToken)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(fetchSignOut(csrfToken))
    dispatch(setIsSignOutModalOn(false))
  }
  const handleCloseClick = () => {
    dispatch(setIsSignOutModalOn(false))
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
          <div className="md:flex items-start w-72 h-24">
            <div className="mt-4 md:mt-0 md:mx-6 text-center md:text-left w-screen">
              <p className="font-bold text-2xl text-blue-900">SignOut?</p>
              <p className="text-sm text-gray-700 mt-1"></p>
              <p className="text-sm text-gray-700 mt-4"></p>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              onClick={handleClick}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 disabled:bg-white disabled:text-gray-200 hover:bg-blue-400 bg-blue-200 text-blue-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              data-testid="card-modal-create-and-update-button"
            >
              SignOut
            </button>
            <button
              onClick={handleCloseClick}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 hover:bg-gray-400 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
              data-testid="card-modal-close-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignOutModal
