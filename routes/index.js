const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('../utils/validation');
const auth = require('../middlewares/auth');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
