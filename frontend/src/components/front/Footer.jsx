import React from 'react'

const Footer = () => {
  return (
    <div className='text-[16px] absolute bottom-0 w-full flex justify-center align-center bg-blue-200 h-auto p-1'>
      &copy; Copyright {new Date().getFullYear()}. All Rights Reserved
    </div>
  )
}

export default Footer
