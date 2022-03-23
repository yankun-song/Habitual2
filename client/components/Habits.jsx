import React from "react";
import { connect } from "react-redux";
import OngoingHabit from "./OngoingHabit.jsx";
import CompletedHabit from "./CompletedHabit.jsx";

const TodaysHabits = (props) => {
  const todaysHabits = props.todaysHabits;
  const ongoingList = [];
  const completedList = [];

  for (let habit of todaysHabits) {
    if (habit.fullfilledPercent !== 1) {
      console.log("ongoing", habit.habitName);
      ongoingList.push(
        <OngoingHabit
          show={props.show}
          updateRecord={props.updateRecord}
          habit={habit}
        />
      );
    } else
      completedList.push(
        <CompletedHabit
          show={props.show}
          updateRecord={props.updateRecord}
          habit={habit}
        />
      );
  }

  return (
    <div className="wrapper-todo">{[...ongoingList, ...completedList]}</div>
  );
};

export default TodaysHabits;
