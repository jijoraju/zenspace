import React from 'react'

function Button(props) {
  const {styleName,children} = props
  return (
    <button className={styleName}>
      {children}
    </button>
  )
}

export default Button
