import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
import { useState } from "react";
import ActionButton from "./ActionButton";

function App() {
	const [botDisplay, setValueBot] = useState("0");
	const [topDisplay, setValueTop] = useState("0");
	const [evaluated, setEvaluated] = useState(false);

	const addDigit = (digit) => {
		if (botDisplay === "0" || botDisplay === "NULL" || evaluated){
			if (digit['digit'] === "."){
				setValueBot("0.")
			} else{
				setValueBot(`${digit['digit']}`);	
			}
			if (evaluated){
				setValueTop("0");
				setEvaluated(false);
			}
		} else if (digit['digit'] === "." && botDisplay.includes('.') ){
			return;
		} else{
			setValueBot(`${botDisplay}${digit['digit']}`);	
		}
	}

	const addOperator = (operator) => {
		if (operator['operator'] === "="){
			setEvaluated(true);
			if (botDisplay === "0" && topDisplay !== "0"){
				if (topDisplay.endsWith("*")){
					setValueBot("0");
					setValueTop(`${topDisplay}${botDisplay}=`);
				} else if (topDisplay.endsWith("/")) {
					setValueBot("NULL");
					setValueTop(`${topDisplay}${botDisplay}=`);
				}else{
					setValueBot(`${topDisplay.slice(0,topDisplay.length - 1)}`);
					setValueTop(`${topDisplay}${botDisplay}=`);
				}
			} else if (topDisplay !== "0"){
				if (topDisplay.endsWith("=")){
					setValueTop("0");
					return
				} else{
					setValueBot(`${eval(`${topDisplay}${botDisplay}`)}`);
					setValueTop(`${topDisplay}${botDisplay}=`);
				}
			}
		} else{
			if (evaluated){
				setValueTop(`${botDisplay}${operator['operator']}`);
				setValueBot("0");
				setEvaluated(false);
			} else if (topDisplay === "0"){
				if(botDisplay.endsWith(".")){
					setValueTop(`${botDisplay.slice(0,botDisplay.length - 1)}${operator['operator']}`)
					setValueBot("0");
				} else if (operator['operator'] === "-" && botDisplay === "0"){
					setValueBot("-");
				} else{
					setValueTop(`${botDisplay}${operator['operator']}`);
					setValueBot("0");
				}
			} else{
				if (botDisplay === "0"){
					setValueTop(`${topDisplay.slice(0,topDisplay.length - 1)}${operator['operator']}`);
				}else{
					setValueTop(`${eval(`${topDisplay}${botDisplay}`)}${operator['operator']}`)
					setValueBot("0");
				}
			}
			
		}

	}

	const action = (type) => {
		if (type['type'] === "clear"){
			if (evaluated){
				setValueBot("0");
				setValueTop("0");
			} else{
				if (botDisplay !== "0"){
					setValueBot("0");
				} else{
					setValueTop("0");
				}
			}
		} else if (type['type'] === "save"){
			let data;
			if (topDisplay !== "0" && !evaluated){
				data = {
					result : `${eval(`${topDisplay}${botDisplay}`)}`
				}
				setValueBot(`${eval(`${topDisplay}${botDisplay}`)}`);
				setValueTop("0");
			} else{
				data = {
					result: botDisplay
				}
			}
			fetch('/store',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
		} else if (type['type'] === "load"){
			fetch('/result',{
				method: 'GET'
			}).then((res) => res.json()).then((data) => {
				console.log(data['result']);
				setValueBot(`${data['result']}`);
			});
		}
	}

	return (
		<div className="App">
			<div id="calculator">
				<div id="old">
					<span>{topDisplay}</span>
				</div>
				<div id="display">
					<span>{botDisplay}</span>
				</div>
				<div id="buttons">
					<ActionButton callback={action} type="load" />
					<ActionButton callback={action} type="save" />
					<ActionButton callback={action} type="clear" />
					<DigitButton callback={addDigit} digit={"1"} />
					<DigitButton callback={addDigit} digit={"2"} />
					<DigitButton callback={addDigit} digit={"3"} />
					<OperatorButton callback={addOperator} operator={"/"} />
					<DigitButton callback={addDigit} digit={"4"} />
					<DigitButton callback={addDigit} digit={"5"} />
					<DigitButton callback={addDigit} digit={"6"} />
					<OperatorButton callback={addOperator} operator={"*"} />
					<DigitButton callback={addDigit} digit={"7"} />
					<DigitButton callback={addDigit} digit={"8"} />
					<DigitButton callback={addDigit} digit={"9"} />
					<OperatorButton callback={addOperator} operator={"-"} />
					<DigitButton callback={addDigit} digit={"."} />
					<DigitButton callback={addDigit} digit={"0"} />
					<OperatorButton callback={addOperator} operator={"="} />
					<OperatorButton callback={addOperator} operator={"+"} />
				</div>
			</div>
		</div>
	);
}

export default App;
