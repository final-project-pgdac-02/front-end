import React from 'react'

const InfoTextComponent = (props) => {
  return (
		<>
			{/* <span className="display-6">{props.foundResult?`${props.foundResult}`:''} {props.text}<strong>{props.title}</strong></span> */}
			<span className="display-6 text-center p-3 mx-auto text-light" style={{ width: "70%" }}>
				{props.foundResults}
				{props.text}
				<strong>{props.title}</strong>
			</span>
		</>
  );
}

export default InfoTextComponent