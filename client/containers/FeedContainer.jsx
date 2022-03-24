import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

import TopBar from "../components/TopBar.jsx";
import Calendar from "../components/Calendar.jsx";
import Habits from "../components/Habits.jsx";
import AddHabit from "../components/AddHabit.jsx";
import GetHistory from "../components/GetHistory.jsx";

// TODO: add calendar
const mapStateToProps = (state) => ({
  userId: state.user.userId,
  username: state.user.username,
  calendar: state.user.calendar,
  todaysHabits: state.user.todaysHabits,
  addPage: state.user.addPage,
  historyPage: state.user.historyPage,
  dateDiff: state.user.dateDiff,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFeed: (userInfo) => dispatch(actions.getFeedActionCreator(userInfo)),
    createHabit: (newHabit) =>
      dispatch(actions.createHabitActionCreator(newHabit)),
    updateRecord: (habitInfo) =>
      dispatch(actions.updateReocrdActionCreator(habitInfo)),
    displayAdd: (bool) => dispatch(actions.displayAddActionCreator(bool)),
    displayHistory: (bool) =>
      dispatch(actions.displayHistoryActionCreator(bool)),
    setDateDiff: (diff) => dispatch(actions.setDateDiffActionCreator(diff)),
  };
};

class FeedContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AddHabit
          userId={this.props.userId}
          addPage={this.props.addPage}
          displayAdd={this.props.displayAdd}
          createHabit={this.props.createHabit}
        />
        <TopBar displayAdd={this.props.displayAdd} />
        <Calendar
          userId={this.props.userId}
          calendar={this.props.calendar}
          displayHistory={this.props.displayHistory}
          dateDiff={this.props.dateDiff}
          setDateDiff={this.props.setDateDiff}
        />
        <GetHistory
          dateDiff={this.props.dateDiff}
          historyPage={this.props.historyPage}
          displayHistory={this.props.displayHistory}
        />
        <Habits
          userId={this.props.userId}
          updateRecord={this.props.updateRecord}
          todaysHabits={this.props.todaysHabits}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
