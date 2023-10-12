import React from 'react'

function CardContainer(props) {
  return (
    <div className="customCardContainer">
      {props.children}
    </div>
  )
}

export default CardContainer
