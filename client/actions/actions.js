import * as types from '../constants/actionTypes';

export const loginUserActionCreator = userInfo => ({
  type: types.LOGIN_USER,
  payload: userInfo,
});

export const logoutUserActionCreator = () => ({
  type: types.LOGOUT_USER,
});

export const getFeedActionCreator = userInfo => ({
  type: types.GET_FEED,
  payload: userInfo,
});

export const updateReocrdActionCreator = habitInfo => ({
  type: types.UPDATE_RECORD,
  payload: habitInfo,
});

export const createHabitActionCreator = newHabit => ({
  type: types.CREATE_HABIT,
  payload: newHabit,
});

export const displayAddActionCreator = bool => ({
  type: types.DISPLAY_ADD,
  payload: bool,
})
