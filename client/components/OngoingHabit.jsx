import React from "react";

const OngoingHabit = (props) => {
  const habit = props.habit;

  function updateRecord(direction) {
    if (habit.fullfilledPercent == 0 && direction == "-") return;
    const newHabit = { habitName: habit.habitName, direction };
    props.updateRecord(newHabit);

    // send request to /edithabit/update
    const currentNum = Math.round(habit.fullfilledPercent * habit.targetNum);
    const newNum = direction === "+" ? currentNum + 1 : currentNum - 1;
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: props.userId,
        habitName: habit.habitName,
        newNum,
      }),
    };

    fetch("http://localhost:3000/edithabit/update", reqOptions).then((res) =>
      res.json()
    );
  }

  return (
    <>
      <div className="item-todo">
        <div className="wrapper-habit-text">
          <div className="habit-name habit-text">{habit.habitName}</div>
          <div className="habit-status habit-text">{`${Math.round(
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
            <div
              className="btn-progress minus"
              onClick={() => {
                updateRecord("-");
              }}
            >
              -
            </div>
            <div
              className="btn-progress plus"
              onClick={() => {
                updateRecord("+");
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngoingHabit;
