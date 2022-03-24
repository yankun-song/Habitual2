import React from "react";

const AddHabit = (props) => {
  function addHabitClick() {
    const habitName = document.querySelector("#habitName").value;
    const targetNum = document.querySelector("#targetNum").value;
    const newHabit = { habitName, targetNum };
    props.createHabit(newHabit);

    // send a add habit request
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: props.userId, habitName, targetNum }),
    };

    fetch("http://localhost:3000/edithabit/add", reqOptions).then((res) =>
      res.json()
    );
  }

  if (!props.addPage) return null;
  

  return (
    <div className="modal-bg">
      <div className="modal">
        <div
          className="modal-close"
          onClick={() => {
            props.displayAdd(false);
          }}
        >
          X
        </div>
        <div className="modal-content">
          <h3 className="modal-title">Set Your Goal!</h3>
        </div>
        <div className="modal-body">
          <input
            className="login-input"
            autoComplete="off"
            type="text"
            id="habitName"
            placeholder="Habit Name"
          />
          <input
            className="login-input"
            autoComplete="off"
            type="text"
            id="targetNum"
            placeholder="Target Number"
          />
        </div>
        <div className="modal-footer">
          <div className="btn-save" onClick={addHabitClick}>
            Add habit
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;
