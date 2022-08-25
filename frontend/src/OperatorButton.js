import React from 'react'

export default function OperatorButton(props) {

	return (
		<button onClick={() => props.callback({operator: props.operator})}>{props.operator}</button>
	)
}

