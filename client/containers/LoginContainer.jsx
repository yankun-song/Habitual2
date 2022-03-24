import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

import LoginForm from "../components/LoginForm.jsx";

const mapStateToProps = (state) => ({
  // habits: state.habits
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(actions.loginUserActionCreator(data)),
    getFeed: (data) => dispatch(actions.getFeedActionCreator(data)),
  };
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LoginForm login={this.props.login} getFeed={this.props.getFeed} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
