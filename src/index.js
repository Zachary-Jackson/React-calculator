import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const rootElement = document.getElementById("root");

// state is the primary information holder for App
const state = { screenDisplay: "", answer: "n/a" };

function newInputHandler(event) {
  /**
   * Determines what to do with a click event.
   * Then calls the appropriate functions
   *
   * :param event: onClick event
   */
  const input = event.currentTarget.textContent;
  const isInt = parseInt(input);

  if (isInt || isInt === 0) {
    state.screenDisplay += input;
  } else if (input !== "clear") {
    state.screenDisplay = operatorHandler(state.screenDisplay, input);
  } else {
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
