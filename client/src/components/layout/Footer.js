import React from 'react'

export default () => {
  // footer.bg-dark.text-white.mt-5.p-4.text-center
  // mt = margin top
  // p = padding 
  return (

    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; { new Date().getFullYear() } DevConnector
    </footer>
  )
}
