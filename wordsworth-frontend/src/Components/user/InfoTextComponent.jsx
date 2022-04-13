import React from 'react'

const InfoTextComponent = (props) => {
  return (
    <>
        {/* <span className="display-6">{props.foundResult?`${props.foundResult}`:''} {props.text}<strong>{props.title}</strong></span> */}
        <span className="display-6">{props.foundResults}{props.text}<strong>{props.title}</strong></span>

    </>
  )
}

export default InfoTextComponent