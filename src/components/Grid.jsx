import React, { useState } from 'react'
import Cell from './Cell';

function Grid(props) {
    let gridArray = [
        "C",
        "Backspace",
        "÷",
        "7",
        "8",
        "9",
        "x",
        "4",
        "5",
        "6",
        "-",
        "1",
        "2",
        "3",
        "+",
        "0", "+/-",
        ".",
        "="
    ];
    const [currentState, setcurrentState] = useState("none")
    function pushOperations(oper) {
        props.setAllOperations([...props.allOperations, oper])
    }
    function removeOperation() {
        if (props.allOperations.length == 0) return;
        let lastOper = props.allOperations.pop();
        lastOper = lastOper.slice(0, -1);
        console.log(lastOper);
        console.log(props.allOperations.length, [...props.allOperations])
        if (lastOper == "") {
            if (props.allOperations.length == 0) {
                props.setAllOperations([])
                setcurrentState("none");
                return;
            }
            let value = props.allOperations[props.allOperations.length-1];
            let isNotNumber = (isNaN(value) && value != ".");
            isNotNumber ? setcurrentState("num") : setcurrentState("oper")
            console.log({value,isNotNumber})
            return;
        }
        props.setAllOperations([...props.allOperations, lastOper]) 
    }
    function appendLastOperationWithChar(oper) {
        let prevoper = props.allOperations.pop();
        prevoper += oper
        props.setAllOperations([...props.allOperations, prevoper])
    }
    function handleNumber(value) {
        if (currentState == "num") {
            if (value == ".") {
                if (props.allOperations[props.allOperations.length - 1].indexOf(".") > -1) {
                    return;
                }
            }
            appendLastOperationWithChar(value);
            setcurrentState("num");
        }
        else {
            if (value == ".") {
                value = "0.";
            }
            pushOperations(value)
            setcurrentState("num");
        }
        
    }
    function handleAction(value) {
        if (value == "Backspace") {
            removeOperation();
            return;
        }
        if (value == "C") {
            props.setAllOperations([]);
            setcurrentState("none");
            return;
        }
        if (value == "=") {
            props.setAllOperations([props.displayedNumber]);
            setcurrentState("num");
            return;
        }
        if (value == "+/-") {
            if (currentState == "num") {
                let num = props.allOperations.pop();
                if (props.allOperations.length == 0) {
                    props.setAllOperations(["-", num]);
                    return;
                }
                let prevoper = props.allOperations.pop();
                if (prevoper == "-") {
                    if (props.allOperations[props.allOperations.length - 1] == "x" ||
                        props.allOperations[props.allOperations.length - 1] == "÷") {
                        props.setAllOperations([...props.allOperations, num]);
                    }
                    else {
                        props.setAllOperations([...props.allOperations,"+",num])
                    }
                    return;
                }
                if (prevoper == "+") {
                    props.setAllOperations([...props.allOperations,"-",num])
                    
                }
                if (prevoper == "÷" || prevoper == "x") {                    
                    props.setAllOperations([...props.allOperations,prevoper,"-",num])
                }
                return;
            }
            return;
        }
        if (currentState == "num") {
            pushOperations(value);
            setcurrentState("oper")
        } else if (currentState == "oper") {
            removeOperation();
            pushOperations(value);
        }
    }
    function handleClick(btnValue) {
        let isNotNumber = (isNaN(btnValue) && btnValue != ".");
        console.log(isNotNumber ? "Action" : "Number");
        isNotNumber ? handleAction(btnValue) : handleNumber(btnValue);
    }
    
    return (
        <>
            {gridArray.map(key => {
                return (
                    <Cell key={key} value={key} text={key}
                        handleClick={handleClick}
                    />
                );
            })}
        </>
    )
}

export default Grid