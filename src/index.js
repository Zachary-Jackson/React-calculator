import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const rootElement = document.getElementById("root");

// state is the primary information holder for App
const state = { screenDisplay: "", answer: "n/a" };

function digitHandler(oldString, input) {
  /**
   * Checks to see if the screenDisplay is empty
   * If so deny the user's operator request
   *
   * :param oldString: The old string that is checked to see if there
   * is an ending period
   * :param input: A string version of a number or period
   * :return if valid: Str in the format of space + input + space
   * : return  if invalid: Str that is the same as oldString
   */

  if (input !== ".") {
    return oldString + input;
  }

  // if input is not a number check if we can place a decimal
  const wordList = oldString.split(/[ ,]+/);
  const lastWord = wordList.slice(-1)[0];

  // If the last word already contains a decimal block operation
  if (lastWord.includes(".") === false) {
    return oldString + input;
  } else {
    return oldString;
  }
}

function newInputHandler(event) {
  /**
   * Determines what to do with a click event.
   * Then calls the appropriate functions
   *
   * :param event: onClick event
   */
  const input = event.currentTarget.textContent;
  const isInt = parseInt(input);

  if (isInt || isInt === 0 || input === ".") {
    state.screenDisplay = digitHandler(state.screenDisplay, input);
  } else if (input !== "clear") {
    state.screenDisplay = operatorHandler(state.screenDisplay, input);
  } else {
    /* If the input is "clear" clear the display*/
    state.screenDisplay = "";
  }

  renderApp();
}

function operatorHandler(oldString, input) {
  /**
   * Checks to see if the screenDisplay is empty
   * If so deny the user's operator request
   *
   * :param oldString: The old string that is checked for truthiness
   * :param input: A string used to create the return string
   * :return if valid: Str in the format of space + input + space
   * : return invalid: Str that is empty ""
   */

  // First check if the last word is an operator
  // If so ignore
  // if input is not a number check if we can place a decimal
  const wordList = oldString.split(/[ ,]+/).filter(Boolean);
  const lastWord = wordList.slice(-1)[0];

  const operators = ["%", "x", "-", "+"];

  if (operators.includes(lastWord)) {
    return oldString;
  }

  if (oldString) {
    return oldString + " " + input + " ";
  }
  return "";
}

function App() {
  return (
    <div className="center">
      <h1 className="center box">
        {state.screenDisplay} = {state.answer}
      </h1>

      <div>
        <button className="large-button" onClick={newInputHandler}>
          7
        </button>
        <button className="large-button" onClick={newInputHandler}>
          8
        </button>
        <button className="large-button" onClick={newInputHandler}>
          9
        </button>
        <button className="large-button" onClick={newInputHandler}>
          %
        </button>
      </div>

      <div>
        <button className="large-button" onClick={newInputHandler}>
          4
        </button>
        <button className="large-button" onClick={newInputHandler}>
          5
        </button>
        <button className="large-button" onClick={newInputHandler}>
          6
        </button>
        <button className="large-button" onClick={newInputHandler}>
          x
        </button>
      </div>

      <div>
        <button className="large-button" onClick={newInputHandler}>
          1
        </button>
        <button className="large-button" onClick={newInputHandler}>
          2
        </button>
        <button className="large-button" onClick={newInputHandler}>
          3
        </button>
        <button className="large-button" onClick={newInputHandler}>
          -
        </button>
      </div>

      <div>
        <button className="large-button" onClick={newInputHandler}>
          0
        </button>
        <button className="large-button" onClick={newInputHandler}>
          .
        </button>
        <button className="large-button" onClick={newInputHandler}>
          clear
        </button>
        <button className="large-button" onClick={newInputHandler}>
          +
        </button>
      </div>
    </div>
  );
}
function renderApp() {
  /**
   * Calls a ReactDom render using <App> on the "root" id
   */
  ReactDOM.render(<App />, document.getElementById("root"));
}

renderApp();
