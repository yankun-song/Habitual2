import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

import TopBar from "../components/TopBar.jsx";
import Calendar from "../components/Calendar.jsx";
import Habits from "../components/Habits.jsx";
import AddHabit from "../components/AddHabit.jsx";
import EditHabit from "../components/EditHabit.jsx";

// TODO: add calendar
const mapStateToProps = (state) => ({
  userId: state.user.userId,
  username: state.user.username,
  calendar: state.user.calendar,
  todaysHabits: state.user.todaysHabits,
  addPage: state.user.addPage,
  showModalEdit: state.user.showModalEdit,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFeed: (userInfo) => dispatch(actions.getFeedActionCreator(userInfo)),
    createHabit: (newHabit) =>
      dispatch(actions.createHabitActionCreator(newHabit)),
    updateRecord: (habitInfo) =>
      dispatch(actions.updateReocrdActionCreator(habitInfo)),

    displayAdd: (bool) => dispatch(actions.displayAddActionCreator(bool)),
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
          addPage={this.props.addPage}
          displayAdd={this.props.displayAdd}
          createHabit={this.props.createHabit}
        />
        {/* <EditHabit 
                    show={this.props.showModalEdit} 
                    habits={this.props.todayHabit}/> */}
        <TopBar displayAdd={this.props.displayAdd} />
        <Calendar calendar={this.props.calendar} />
        <Habits
          updateRecord={this.props.updateRecord}
          todaysHabits={this.props.todaysHabits}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
