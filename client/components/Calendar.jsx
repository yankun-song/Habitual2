import React from "react";
import { connect } from "react-redux";

const Calendar = (props) => {
  function getDetails(e) {
    console.log("difference: ", 41 - e.target.getAttribute("idx"));
  }
  const currentMonth = [];
  let key = -1;
  for (let avg of props.calendar) {
    key += 1;
    avg = Math.round(avg * 100);
    if (avg >= 100) {
      currentMonth.push(
        <div className="square green" key={"square" + key} idx={key}></div>
      );
    } else if (avg >= 60)
      currentMonth.push(
        <div
          className="square yellow-green"
          key={"square" + key}
          idx={key}
        ></div>
      );
    else if (avg > 0)
      currentMonth.push(
        <div className="square beige" key={"square" + key} idx={key}></div>
      );
    else
      currentMonth.push(
        <div
          className="square grey"
          key={"square" + key}
          idx={key}
          onClick={getDetails}
        ></div>
      );
  }

  return (
    <div className="calendar">
      <div className="squares-wrapper">{currentMonth}</div>
    </div>
  );
};

export default Calendar;
