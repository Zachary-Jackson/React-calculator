import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Calculator extends React.Component {
  state = { screenDisplay: "", answer: "n/a" };

  createAnswer(equation) {
    /**
     * Calculates an answer based on an equation
     *
     * :param equation: A string version of an equation
     * :return: The new calculated equaiton in string format
     */

    let wordList = equation.split(/[ ,]+/).filter(Boolean);

    // We need to do order of operations, which means multiplication,
    // division, addition, subtraction
    let i;

    // May need to run this for loop multiple times
    while (wordList.includes("x")) {
      for (i = 0; i < wordList.length; i++) {
        if (wordList[i] == "x") {
          const newValue = wordList[i - 1] * wordList[i + 1];
          wordList[i] = newValue;
          delete wordList[i + 1];
          delete wordList[i - 1];
          wordList = wordList.filter(e => e !== undefined);
        }
      }
    }

    while (wordList.includes("/")) {
      for (i = 0; i < wordList.length; i++) {
        if (wordList[i] == "/") {
          const newValue = wordList[i - 1] / wordList[i + 1];
          wordList[i] = newValue;
          delete wordList[i + 1];
          delete wordList[i - 1];
          wordList = wordList.filter(e => e !== undefined);
        }
      }
    }

    while (wordList.includes("+")) {
      for (i = 0; i < wordList.length; i++) {
        if (wordList[i] == "+") {
          const newValue =
            parseFloat(wordList[i - 1]) + parseFloat(wordList[i + 1]);
          wordList[i] = newValue;
          delete wordList[i + 1];
          delete wordList[i - 1];
          wordList = wordList.filter(e => e !== undefined);
        }
      }
    }

    while (wordList.includes("-")) {
      for (i = 0; i < wordList.length; i++) {
        if (wordList[i] == "-") {
          const newValue =
            parseFloat(wordList[i - 1]) - parseFloat(wordList[i + 1]);
          wordList[i] = newValue;
          delete wordList[i + 1];
          delete wordList[i - 1];
          wordList = wordList.filter(e => e !== undefined);
        }
      }
    }

    return wordList;
  }

  digitHandler(oldString, input) {
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

  operatorHandler(oldString, input) {
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

    const operators = ["/", "x", "-", "+"];

    if (operators.includes(lastWord)) {
      return oldString;
    }

    if (oldString) {
      return oldString + " " + input + " ";
    }
    return "";
  }

  newInputHandler = event => {
    /**
     * Determines what to do with a click event.
     * Then calls the appropriate functions
     *
     * :param event: onClick event
     */
    const input = event.currentTarget.textContent;
    const isInt = parseFloat(input);

    if (isInt || isInt === 0 || input === ".") {
      var newDisplay = this.digitHandler(this.state.screenDisplay, input);
      this.setState(({ screenDisplay }) => ({
        screenDisplay: newDisplay
      }));
    } else if (input !== "clear") {
      var newDisplay = this.operatorHandler(this.state.screenDisplay, input);
      this.setState(({ screenDisplay }) => ({
        screenDisplay: newDisplay
      }));
    } else {
      /* If the input is "clear" clear the display*/
      var newDisplay = "";
      this.setState(({ screenDisplay }) => ({
        screenDisplay: newDisplay
      }));
    }

    // Calculates and changes the calculator answer
    const newAnswer = this.updateAnswer(newDisplay);
    this.setState(({ answer }) => ({
      answer: newAnswer
    }));
  };

  updateAnswer(display) {
    /**
     * Uses display to see if an answer can be shown
     *
     * :param display: A string value in the format of a calculator screen
     * :return if applicable: The new calculated answer
     * "return non-applicable: n/a"
     */
    if (display === "") {
      return "n/a";
    }

    // Checks to see if the last value is an operator or ends with a period
    const wordList = display.split(/[ ,]+/).filter(Boolean);
    const lastWord = wordList.slice(-1)[0];

    const operators = ["%", "x", "-", "+"];

    if (operators.includes(lastWord)) {
      return "n/a";
    } else if (lastWord.slice(-1)[0] === ".") {
      return "n/a";
    }

    // The display can create a new answer
    return this.createAnswer(display);
  }

  render() {
    return (
      <div className="center">
        <h1 className="center box">
          {this.state.screenDisplay} = {this.state.answer}
        </h1>

        <div>
          <button className="large-button" onClick={this.newInputHandler}>
            7
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            8
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            9
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            /
          </button>
        </div>

        <div>
          <button className="large-button" onClick={this.newInputHandler}>
            4
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            5
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            6
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            x
          </button>
        </div>

        <div>
          <button className="large-button" onClick={this.newInputHandler}>
            1
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            2
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            3
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            -
          </button>
        </div>

        <div>
          <button className="large-button" onClick={this.newInputHandler}>
            0
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            .
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            clear
          </button>
          <button className="large-button" onClick={this.newInputHandler}>
            +
          </button>
        </div>
      </div>
    );
  }
}

const element = <Calculator />;

ReactDOM.render(element, document.getElementById("root"));
