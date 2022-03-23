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

export const showModalAddActionCreator = show => ({
  type: types.SHOW_MODAL_ADD,
  payload: show,
})
export const hideModalAddActionCreator = show => ({
  type: types.HIDE_MODAL_ADD,
  payload: show,
})
export const showModalEditActionCreator = show => ({
  type: types.SHOW_MODAL_EDIT,
  payload: show,
})
export const hideModalEditActionCreator = show => ({
  type: types.HIDE_MODAL_EDIT,
  payload: show,
})