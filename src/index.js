import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const rootElement = document.getElementById("root");

// state is the primary information holder for App
const state = { screenDisplay: "9 x 9 + 1", answer: "82" };

function App() {
  return (
    <div class="center">
      <h1 class="center box">
        {state.screenDisplay} = {state.answer}
      </h1>

      <div>
        <button class="large-button">7</button>
        <button class="large-button">8</button>
        <button class="large-button">9</button>
        <button class="large-button">%</button>
      </div>

      <div>
        <button class="large-button">4</button>
        <button class="large-button">5</button>
        <button class="large-button">6</button>
        <button class="large-button">X</button>
      </div>

      <div>
        <button class="large-button">1</button>
        <button class="large-button">2</button>
        <button class="large-button">3</button>
        <button class="large-button">-</button>
      </div>
      <div>
        <button class="large-button">0</button>
        <button class="large-button">.</button>
        <button class="large-button">=</button>
        <button class="large-button">+</button>
      </div>
    </div>
  );
}
function renderApp() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

renderApp();
