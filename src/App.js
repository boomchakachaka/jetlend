import React from "react";

import Dialog from "./Components/Dialog";

import "./styles.scss";

export default function App() {
  const [isOpen, setOpen] = React.useState(false);
  const [isDone, setDone] = React.useState(false);

  function handleClick() {
    if (isDone) {
      alert("«Действие выполнено»");
      return false;
    }

    setOpen(!isOpen);
  }

  return (
    <div className="App">
      <button onClick={() => handleClick()} className={"button"}>
        Выполнить действие
      </button>

      {isOpen && <Dialog opened={isOpen} setOpen={setOpen} setDone={setDone} />}
    </div>
  );
}
