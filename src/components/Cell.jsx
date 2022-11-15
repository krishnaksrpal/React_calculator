import React from 'react'

function Cell(props) {
    return (
        <span
            className="cell"
            onClick={() => { props.handleClick(props.value) }}
        >
            {props.text != "Backspace" ? props.text : String.fromCharCode(9003)}
        </span>
    );
}

export default Cell