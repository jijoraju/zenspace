import React from 'react'

function Button(props) {
  const {styleName,children,disabled, onClick } = props
  return (
    <button 
    className={styleName} disabled={disabled} onClick={onClick} >
      {children}
    </button>
  )
}

export default Button
