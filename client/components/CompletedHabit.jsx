import React from "react";

const CompletedHabit = (props) => {
  const habit = props.habit;

  function updateRecord() {
    const newHabit = { habitName: habit.habitName, direction: "-" };
    props.updateRecord(newHabit);

    // send request to /edithabit/update
    const newNum = Math.round(habit.fullfilledPercent * habit.targetNum) - 1;
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
              className="progressbar-completed"
              style={{ width: `${habit.fullfilledPercent * 100}%` }}
            ></div>
          </div>
          <div className="wrapper-btns">
            <div className="btn-big-minus" onClick={updateRecord}>
              -
            </div>
            {/* <div className="btn-progress plus" onClick={increment}>
            +
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedHabit;
