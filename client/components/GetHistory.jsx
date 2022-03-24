import React from "react";

const GetHistory = (props) => {
  if (!props.historyPage) return null;

  //========================REQUEST PART====================
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: props.userId,
      difference: props.dateDiff,
    }),
  };

  fetch("http://localhost:3000/getmore", reqOptions)
    .then((res) => res.json())
    .then((data) => {
      date = data.date;
      records = data.thatDaysHabits;
      const toShows = [<div key={-1}>=======================</div>];
      let key = 0;
      for (let record of records) {
        toShows.push(
          <div key={key++}>
            <div>Habit Name: {record.habitName}</div>
            <div>
              Fullfilled: {(record.fullfilledPercent * 100).toFixed(2)}%
            </div>
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
    });

};

export default GetHistory;
