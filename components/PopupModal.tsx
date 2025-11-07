import React from 'react'

const PopupModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-[400px] text-center">
      <h2 className="text-lg font-semibold mb-4">This is a Modal</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Your modal content goes here.</p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Close
      </button>
    </div>
  </div>
  
  )
}

export default PopupModal