import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupForm from '../components/SignupForm.jsx';

const mapStateToProps = (state) => ({
  // habits: state.habits
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(actions.loginUserActionCreator(data)),
    getFeed: (data) => dispatch(actions.getFeedActionCreator(data)),
  };
};

class SignupContainer extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <SignupForm />
      </div>
    );
  }
};

export default SignupContainer;