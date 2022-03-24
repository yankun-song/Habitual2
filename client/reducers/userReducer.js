import * as types from "../constants/actionTypes";

const initialState = {
  userId: 10000,
  username: "Super User",
  calendar: Array(42).fill(0),
  todaysHabits: [
    { habitName: "drink water", targetNum: 5, fullfilledPercent: 0.4 }, // each element is an object
    { habitName: "walk dog", targetNum: 1, fullfilledPercent: 1 },
  ],
  addPage: false,
  historyPage: false,
  dateDiff: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER: {
      const { userId, username } = action.payload;
      const newState = { ...state, userId, username };
      return newState;
    }

    case types.GET_FEED: {
      const { userId, username, calendar, todaysHabits } = action.payload;
      const newState = { ...state, userId, username, calendar, todaysHabits };
      return newState;
    }

    // should get new Avg from db, now not updating calendar
    case types.UPDATE_RECORD: {
      //payload: {habitName:"walk dog", direction:"+"}
      const newTodaysHabits = JSON.parse(JSON.stringify(state.todaysHabits));
      for (let habit of newTodaysHabits) {
        if (habit.habitName === action.payload.habitName) {
          if (action.payload.direction === "+") {
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
      return { ...state, todaysHabits: newTodaysHabits };
    }

    case types.DISPLAY_ADD: {
      return {
        ...state,
        addPage: action.payload,
      };
    }

    case types.DISPLAY_HISTORY: {
      return {
        ...state,
        historyPage: action.payload,
      };
    }

    case types.SET_DATE_DIFF: {
      return {
        ...state,
        dateDiff: action.payload,
      };
    }

    case types.CREATE_HABIT: {
      const newTodaysHabits = JSON.parse(JSON.stringify(state.todaysHabits));
      const newHabit = { ...action.payload, fullfilledPercent: 0 };
      newTodaysHabits.push(newHabit);
      return {
        ...state,
        addPage: false,
        todaysHabits: newTodaysHabits,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
