import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

import TopBar from "../components/TopBar.jsx";
import Calendar from "../components/Calendar.jsx";
import ToDos from "../components/ToDos.jsx";
import Completed from "../components/Completed.jsx";
import AddHabit from "../components/AddHabit.jsx";
import EditHabit from "../components/EditHabit.jsx";

// TODO: add calendar
const mapStateToProps = (state) => ({
  userId: state.user.userId,
  userName: state.user.userName,
  calendar: state.user.calendar,
  todaysHabits: state.user.todaysHabits,
  showModalAdd: state.user.showModalAdd,
  showModalEdit: state.user.showModalEdit,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFeed: (userInfo) => dispatch(actions.getFeedActionCreator(userInfo)),
    updateRecord: (habitInfo) =>
      dispatch(actions.updateReocrdActionCreator(habitInfo)),

    showModalAdd: (show) => dispatch(actions.showModalAddActionCreator(show)),
    hideModalAdd: (show) => dispatch(actions.hideModalAddActionCreator(show)),
    showModalEdit: (show) => dispatch(actions.showModalEditActionCreator(show)),
    hideModalEdit: (show) => dispatch(actions.hideModalEditActionCreator(show)),
  };
};

class FeedContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <AddHabit 
                    show={this.props.showModalAdd}
                    hideModalAdd={this.props.hideModalAdd} 
                    habits={this.props.habits}/> */}
        {/* <EditHabit 
                    show={this.props.showModalEdit} 
                    habits={this.props.todayHabit}/> */}
        <TopBar showModalAdd={this.props.showModalAdd} />
        <Calendar calendar={this.props.calendar} />
        <ToDos
          show={this.props.showModalEdit}
          completeBool={this.props.completeBoolHabit}
          incrementNum={this.props.incrementNumHabit}
          decrementNum={this.props.decrementNumHabit}
          todayHabit={this.props.todayHabit}
        />
        {/* <Completed 
                    show={this.props.showModalEdit} 
                    uncompleteBool={this.props.uncompleteBoolHabit} 
                    decrementNum={this.props.decrementNumHabit} 
                    todayHabit={this.props.todayHabit}/> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
