const dbController = {};
const db = require('../models/dbModels');

dbController.deleteUser = async (req, res, next) => {
  //need email and password.
  const { email, password } = req.body;
  // console.log("req body: ", req.body);
  params = [email, password];
  try {
    const deleteUserQuery = 
    `DELETE FROM users WHERE email = $1 AND password = $2;`;
    const deletedUser = await db.query(deleteUserQuery, params);
    res.locals.success = true;
    return next();
  } catch (error) {
      return next({
        log: 'Express error in deleteUser middleware',
        status: 400,
        message: {
          err: `dbController.deleteUser: ERROR: ${error}`,
      }
    })
  }
}

// Store new user's account info into Databse
dbController.saveUser = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = res.locals.newUser;
  params = [firstName, lastName, username, email, password];
  try {
    const saveUserQuery = `
        INSERT INTO users (first_name, last_name, username, email, password)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
        `;
    const newUser = await db.query(saveUserQuery, params);
    //res.locals.userId = newUser.rows[0].id;
    res.locals.success = true;
    return next();
  } catch (error) {
    return next({
      log: 'Express error in saveUser middleware',
      status: 400,
      message: {
        err: `dbController.saveUser: ERROR: ${error}`,
      },
    });
  }
};

// Validate matching user info from frontend and database
dbController.checkUser = async (req, res, next) => {
  // res.locals.loginUser
  const { email, password } = res.locals.loginUser;
  params = [email, password];
  try {
    const checkUserQuery = `
    SELECT id AS userId, username
    FROM users
    WHERE email = $1 AND password = $2
    `;
    // SELECT id AS userId FROM users
    // WHERE email = $1 AND password = $2

    // SELECT id AS userId, username
    // FROM users
    // WHERE email = $1 AND password = $2
    const result = await db.query(checkUserQuery, params);
    if (result.rows.length) {
      res.locals.result = result.rows[0];
      // res.locals.result.userID = result.row[0] // gives userID
      // res.locals.result.username = result.row[3] // gives username
      return next();
    }
    return next({
      log: 'No such user or pw dont match',
      status: 400,
      message: {
        err: `dbController.checkUser: no such user or pw dont match`,
      },
    });
  } catch (error) {
    return next({
      log: 'Express error in checkUser middleware',
      status: 400,
      message: {
        err: `dbController.checkUser: ERROR: ${error}`,
      },
    });
  }
};

// return past history and today's record
dbController.getUserInfo = async (req, res, next) => {
  const userId = res.locals.userId;

  // Get Calendar current date and its the past 42 days
  const calendarQuery = `
      SELECT avg_percent, date FROM daily_avgs
      WHERE user_id=$1 AND date BETWEEN (SELECT CURRENT_DATE)-integer'41' AND (SELECT CURRENT_DATE)
      ORDER BY date;
        `;
  // Populate calendarArray with 42 days // date2.getTime() - date1.getTime(), check if difference is 1. If so, push in the info. If greater than, then push in 0 until it is 1.
  const habitRecord = await db.query(calendarQuery, [userId]);
  res.locals.calendarRecord = []; //
  //console.log('here is the habit record.rows ', habitRecord.rows);
  
  for (let i = 0; i < 42 - habitRecord.rows.length; i++) {
    res.locals.calendarRecord.push(0);
  }


  //iterate through our array of percentages and dates
  //check to see if date[i + 1] - date[i] = 1. Save as variable.
    //if it is not, then loop and push in 0's until variable is 1.
  
  const habitRecordRows = habitRecord.rows;
  for (let j = 0; j < habitRecordRows.length - 1; j++){
    let dateDiff = Math.round((habitRecordRows[j + 1].date - habitRecordRows[j].date) / (1000 * 3600 * 24));
    console.log(habitRecordRows[j+ 1].date, dateDiff);
    if (dateDiff === 1){
      res.locals.calendarRecord.push(Number(habitRecordRows[j].avg_percent))
    } else {
      while (dateDiff > 1){
        res.locals.calendarRecord.push(0);
        dateDiff--;
      }
    }
  }
  // for (let row of habitRecord.rows) {

  //   res.locals.calendarRecord.push(Number(row.fullfilled_percent));
  // }


//uhr
        //JOIN habits h ON uhr.habit_name = h.habit_name//
  // Retrieve today's habit progress
  const todayRecordQuery = `
        SELECT user_id, habit_name, fullfilled_percent
        FROM user_habit_records
        WHERE date=(SELECT CURRENT_DATE) AND user_habit_records.user_id=$1;`;
  const todayRecord = await db.query(todayRecordQuery, [userId]);
  res.locals.todayHabit = [];
  console.log(todayRecord.rows);

  // Extract data from database and store into habit
  for (let row of todayRecord.rows) {
    // const habit = [];
    const habit = {};
    //habit.push(row.habit_id);
    // habit.push(row.habit_name);
    habit.habitName = row.habit_name;

    // find target number
    const targetQuery = `
    SELECT target_num FROM user_habits
    WHERE user_id=$1 AND habit_name=$2;
    `;
    const targetNum = await db.query(targetQuery, [row.user_id, row.habit_name]);
    habit.targetNum = targetNum.rows[0].target_num;

    // if (row.fullfilled_percent != 0 || row.fullfilled_percent != 1)
    //   habit.push(1);
    // else 
    // habit.push(row.fullfilled_percent);
    habit.fulfilledPercent = row.fullfilled_percent;
    res.locals.todayHabit.push(habit);
  }
  return next();
};

// what res.locals looks like from previous middleware
// res.locals.userId = userId;
// res.locals.habitId = habitName; 
// res.locals.targetNum = targetNum;

// add a new user-habit pair
dbController.assignHabit = async (req, res, next) => {
  // add to user-habits table
  console.log('req body is in dbController.assignHabit', req.body, 'res.locals is ', res.locals)
  const user_id = res.locals.user_id;
  const habit_name = res.locals.habit_name;
  const target_num = res.locals.target_num;
  // console.log(user_id, habit_name, target_num);
  
  const insertUserHabitQuery = `
      INSERT INTO user_habits (user_id, habit_name, target_num, active)
      VALUES ($1, $2, $3, 'true');
        `;
        
  const insertUserHabit = await db.query(insertUserHabitQuery, [
    user_id,
    habit_name,
    target_num,
  ]);
  
  // add a new user-habit-record row
  const insertUHRQuery = `
      INSERT INTO user_habit_records (user_id, habit_name, date, fullfilled_percent)
      VALUES ($1, $2, (SELECT CURRENT_DATE), 0);
      `;
  const insertUHR = await db.query(insertUHRQuery, [user_id, habit_name]);

  // update the corresponding row in daily-count (update or create)
  return next();
};

// update today's record
dbController.updateRecord = async (req, res, next) => {
  // update user-habit-records
  const userId = res.locals.userId;
  const habit_name = res.locals.habit_name;
  const newNum = res.locals.newNum;

  // find target number
  const targetQuery = `
    SELECT target_num FROM user_habits
    WHERE user_id=$1 AND habit_name=$2;
    `;
  const targetNum = await db.query(targetQuery, [userId, habitId]);
  const target = targetNum.rows[0].target_num;
  //console.log(target, typeof target);
  let newPercent = 0;
  if (typeof target === 'number') {
    newPercent = newNum / target;
  } else {
    newPercent = newNum ? 1 : 0;
  }

  const updateUHRQuery = `
      UPDATE user_habit_records
      SET fullfilled_percent=$1
      WHERE user_id=$2 AND habit_name=$3 AND date=(SELECT CURRENT_DATE)
      `;
  const updateUHR = await db.query(updateUHRQuery, [
    newPercent,
    userId,
    habitId,
  ]);


  // let newDailyPercent = (Sum all fullfilled_percent from UHR) / number of habits on selected date
  // const getAllPercent
  
  // const updateDailyPercentQuery = `
  //   UPDATE daily_count
  //   SET total_percent = $1
  //   WHERE user_id = $2 AND date=(SELECT CURRENT_DATE)
  // `
  // const updateDailyPercent = await db.query(updateDailyPercentQuery, [newDailyPercent, userId])
 


  return next();
};

module.exports = dbController;



  // Get today's habit progress

  //[[habit_name, targetNum, fullfilled_percent]]
  // [["water", 5, 0.5], ["Make bed",NULL, 0]]

  // -----------BUG--------
  //
  //       SELECT h.habit_name, uh.target_num, uhr.fullfilled_percent
  //       FROM user_habit_records uhr
  //       LEFT OUTER JOIN habits h ON uhr.habit_id = h.id
  //       LEFT OUTER JOIN user_habits uh ON uh.habit_id = uhr.habit_id
  //       WHERE user_id=$1 AND date=(SELECT CURRENT_DATE);
  //       `;