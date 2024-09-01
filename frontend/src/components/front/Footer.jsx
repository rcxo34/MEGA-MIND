import React from 'react'

const Footer = () => {
  return (
    <div className="text-[20px] absolute bottom-1 inset-x-0 flex justify-center items-center h-auto p-1 font-sofia">
  &copy; Copyright {new Date().getFullYear()} MegaMind, Inc.
</div>
  )
}

export default Footer
