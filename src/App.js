
import React,{useState,useEffect} from 'react';
import Grid from './components/Grid';
function App() {
  const [allOperations, setAllOperations] = useState([])
  const [displayedNumber, setdisplayedNumber] = useState("0")
  useEffect(() => {
    let operations = allOperations;
    let oper = allOperations[allOperations.length - 1];
    operations = operations
      .join("")
      .replace(/x/g, "*")
      .replace(/÷/g, "/");
    if (oper == "x" || oper == "÷" || oper == "+" || oper == "-") {
      // allOperations.pop();
      operations = operations.slice(0, -1);
    }
    console.log({ operations ,allOperations });
    let result = eval(operations);
    // allOperations.push(oper);
    setdisplayedNumber(result ? result : "0")
  }, [allOperations])
  
  var allOperationsStr = allOperations.join(" ");
  
  return (
    <div className="calc-wrapper dark">
      <div id="calc">
        <div className="display">
          <span className="top-line">{allOperationsStr}</span>
          <span className="results">{displayedNumber}</span>
        </div>
        <Grid setAllOperations={setAllOperations} allOperations={allOperations} displayedNumber={displayedNumber}></Grid>
      </div>
    </div>
  );
}

export default App;
