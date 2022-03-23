import React from "react";

const OngoingHabit = (props) => {
  const habit = props.habit;

  function increment() {
    if (habit.status < habit.goal) {
      props.incrementNum(habit[0]);
      //add PUT req to backend
    }
  }
  function decrement() {
    if (habit.status > 0) {
      props.decrementNum(habit[0]);
      // add PUT req to backend
    }
  }
  const editHabit = () => {
    props.show();
  };
  return (
    <>
      <div>Ongoing:</div>
      <div className="item-todo">
        <div className="wrapper-habit-text">
          <div className="habit-name habit-text">{habit.habitName}</div>
          <div className="habit-status habit-text">{`${Math.floor(
            habit.fullfilledPercent * habit.targetNum
          )}/${habit.targetNum}`}</div>
        </div>
        <div className="progress-container">
          <div className="wrapper-progressbar" onClick={() => {}}>
            <div
              className="progressbar"
              style={{ width: `${habit.fullfilledPercent * 100}%` }}
            ></div>
          </div>
          <div className="wrapper-btns">
            <div className="btn-progress minus" onClick={decrement}>
              -
            </div>
            <div className="btn-progress plus" onClick={increment}>
              +
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngoingHabit;
