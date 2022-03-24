import React from "react";
import { connect } from "react-redux";
import OngoingHabit from "./OngoingHabit.jsx";
import CompletedHabit from "./CompletedHabit.jsx";

const TodaysHabits = (props) => {
  const todaysHabits = props.todaysHabits;
  const ongoingList = [];
  const completedList = [];
  let dashboard = [];
  let key = 0;
  for (let habit of todaysHabits) {
    key += 1;
    if (habit.fullfilledPercent !== 1) {
      ongoingList.push(
        <OngoingHabit
          key={"ongoing" + key}
          show={props.show}
          updateRecord={props.updateRecord}
          habit={habit}
        />
      );
    } else
      completedList.push(
        <CompletedHabit
          key={"completed" + key}
          show={props.show}
          updateRecord={props.updateRecord}
          habit={habit}
        />
      );
  }
  if (ongoingList.length !== 0) {
    dashboard.push(<div key={"ongoingTitle"}>Ongoing:</div>);
    dashboard = dashboard.concat(ongoingList);
  }
  if (completedList.length !== 0) {
    dashboard.push(<div key={"completedTitle"}>Completed:</div>);
    dashboard = dashboard.concat(completedList);
  }
  return <div className="wrapper-todo">{dashboard}</div>;
};

export default TodaysHabits;
