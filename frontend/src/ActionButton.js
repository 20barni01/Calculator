import React from 'react'

export default function ActionButton(props) {
	if (props.type === "clear"){
		return (
			<button id="span" onClick={() => props.callback({type: props.type})}>{props.type}</button>
		)
	} else{
		return (
			<button onClick={() => props.callback({type: props.type})}>{props.type}</button>
		)
	}
}
