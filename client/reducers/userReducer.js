import * as types from "../constants/actionTypes";

const initialState = {
  userId: 10000,
  userName: "Super User",
  calendar: Array(28).fill(0),
  todaysHabits: [
    { habitName: "drink water", targetNum: 5, fullfilledPercent: 0.4 }, // each element is an object
    { habitName: "walk dog", targetNum: 1, fullfilledPercent: 1 },
  ],
  showModalAdd: false,
  showModalEdit: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FEED: {
      const { userId, userName, calendar, todaysHabits } = action.payload;
      const newState = { ...state, userId, userName, calendar, todaysHabits };
      return newState;
    }

    // should get new Avg from db, now not updating calendar
    case types.UPDATE_RECORD: {
      //payload: {habitName:"walk dog", direction:"+", newAvg}
      const newTodaysHabits = JSON.parse(JSON.stringify(state.todaysHabits));
      for (let habit of newTodaysHabits) {
        if (habit.habitName === action.payload.habitName) {
          if (direction === "+") {
            habit.fullfilledPercent =
              (habit.targetNum * habit.fullfilledPercent + 1) / habit.targetNum;
            break;
          } else {
            habit.fullfilledPercent =
              (habit.targetNum * habit.fullfilledPercent - 1) / habit.targetNum;
            break;
          }
        }
      }
      return {...state, todaysHabits: newTodaysHabits}
    }

    case types.SHOW_MODAL_ADD: {
      let showModalAdd = true;

      return {
        ...state,
        showModalAdd,
      };
    }
    case types.HIDE_MODAL_ADD: {
      let showModalAdd = false;

      return {
        ...state,
        showModalAdd,
      };
    }
    case types.SHOW_MODAL_EDIT: {
      let showModalEdit = true;

      return {
        ...state,
        showModalEdit,
      };
    }
    case types.HIDE_MODAL_EDIT: {
      let showModalEdit = false;

      return {
        ...state,
        showModalEdit,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
