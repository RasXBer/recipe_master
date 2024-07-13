// const router = require('express').Router();
// const {
//   getUsers,
//   getSingleUser,
//   createUser,
// } = require('../../controllers/userController');

// // /api/users
// router.route('/').get(getUsers).post(createUser);

// // /api/users/:userId
// router.route('/:userId').get(getSingleUser);

// module.exports = router;

const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/login
router.route('/login').post(loginUser);

module.exports = router;