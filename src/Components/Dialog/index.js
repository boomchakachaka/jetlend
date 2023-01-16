import React from "react";

import cn from "clsx";
import "./styles.scss";

const NUMBER_OF_SECONDS = 5;

export default function Dialog({ opened, setOpen, setDone }) {
  const wrapperRef = React.useRef(null);
  const [inProcess, setInProcess] = React.useState(true);
  const [count, setCount] = React.useState(NUMBER_OF_SECONDS);

  function handleClose() {
    setOpen(!opened);
  }

  function handleConfirm() {
    setDone(true);
    handleClose();
  }

  function handleOutClick(event) {
    const { current: wrapperElement } = wrapperRef;
    const target = event.target;

    if (wrapperElement === target) {
      handleClose();
    }
  }

  React.useEffect(() => {
    if (count === 0 && opened) {
      setInProcess(!inProcess);
    }
  }, [count]);

  React.useEffect(() => {
    if (count > 0 && opened) {
      setTimeout(setCount, 1000, count - 1);
    }
  }, [count, opened]);

  const classNameCloseDialog = "dialog__close";
  const classNameContent = "wrapper__content";
  const classNameDialog = "dialog";
  const classNameNum = cn("num", { hidden: count === 0 });

  return (
    <div className={"wrapper"}>
      <div
        ref={wrapperRef}
        className={classNameContent}
        onClick={handleOutClick}
      >
        <div className={classNameDialog}>
          <div className={classNameCloseDialog} onClick={handleClose} />
          <div className={"dialog__header"}>
            <h2>Согласие с правилами</h2>
            <h3 className={"dialog__title"}>
              «Для данной функции применяются особые условия и правила
              пользования, их необходимо подтвердить, нажав на кнопку
              Подтвердить»
            </h3>
          </div>
          <div className={"dialog__content"}>
            <button
              disabled={inProcess}
              onClick={handleConfirm}
              className={cn("button", "button__confirm")}
            >
              Подтвердить
              <span className={classNameNum}>{count}</span>
            </button>
            <button
              onClick={handleClose}
              className={cn("button", "button__close")}
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
