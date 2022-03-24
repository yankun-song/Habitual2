const userController = {};

// Rextract and save new user's account info from frontend into res.locals
userController.addUser = (req, res, next) => {
  const userProps = ['firstName', 'lastName', 'username', 'email', 'password'];
  res.locals.newUser = {};
  

  for (const prop of userProps) {
    if (!req.body[prop]) {
      return next({
        log: 'UserController.addUser ERROR: Properties on request body undefined',
        message: {
          err: 'UserController.addUser ERROR: Incorrect data received',
        },
      });
    }
    res.locals.newUser[prop] = req.body[prop];
  }
  return next();
};

// Extract user email/pw from frontent, and store into res.locals
userController.checkUser = (req, res, next) => {
  const userProps = ['email', 'password'];
  res.locals.loginUser = {};
  // console.log('req body is ', req.body)
  for (const prop of userProps) {
    if (!req.body[prop]) {
      return next({
        log: 'UserController.checkUser ERROR: Properties on request body undefined',
        message: {
          err: 'UserController.checkUser ERROR: Incorrect data received',
        },
      });
    }
    res.locals.loginUser[prop] = req.body[prop];
  }
  return next();
};

// Get user email from feed request
userController.getUserInfo = (req, res, next) => {
  //console.log('in get user info on the user Controller')
  const userId = req.body.userId;
  if (!userId)
    return next({
      log: 'UserController.getUserInfo ERROR: No user id given',
      message: {
        err: 'UserController.getUserInfo ERROR: No user id given',
      },
    });
  res.locals.userId = userId;
  return next();
};

userController.assignHabit = (req, res, next) => {
  console.log("console.log in userController.assignHabbit: ", req.body)
  const { userId, habit_name, target_num } = req.body;
  res.locals.user_id = userId;
  res.locals.habit_name = habit_name; 
  res.locals.target_num = target_num;
  return next();
};

userController.updateRecord = (req, res, next) => {
  const { userId, habitName, newNum } = req.body;
  res.locals.userId = userId;
  res.locals.habitId = habitPairs[habitName];
  res.locals.newNum = newNum;
  return next();
};

module.exports = userController;
