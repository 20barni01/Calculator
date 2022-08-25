import React from 'react'

export default function DigitButton(props) {

	return (
		<button onClick={() => props.callback({digit: props.digit})}>{props.digit}</button>
	)
}
