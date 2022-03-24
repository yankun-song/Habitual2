import React from "react";

const GetHistory = (props) => {
  if (!props.historyPage) return null;



  const dateDiff = props.dateDiff;

  //========================REQUEST PART====================
  const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
          userId: userId,
          habitName: selectedHabit,
          targetNum: selectedTarget,
      })
  }

  const records = [
    { habitName: "drink water", fullfilledPercent: 0.4 },
    { habitName: "walk yankun’s dog", fullfilledPercent: 0 },
  ];
  const toShows = [<div key={-1}>=======================</div>];
  let key = 0;
  for (let record of records) {
    toShows.push(
      <div key={key++}>
        <div>Habit Name: {record.habitName}</div>
        <div>Fullfilled: {(record.fullfilledPercent * 100).toFixed(2)}%</div>
        <div>=======================</div>
      </div>
    );
  }

  return (
    <div className="modal-bg">
      <div className="modal">
        <div
          className="modal-close"
          onClick={() => {
            props.displayHistory(false);
          }}
        >
          X
        </div>
        <div className="modal-body">{toShows}</div>
      </div>
    </div>
  );
};

export default GetHistory;
