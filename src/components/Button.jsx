import React from 'react'

function Button(props) {
  const {styleName,children,disabled } = props
  return (
    <button className={styleName} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
