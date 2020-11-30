const { UsersService, AuthService } = require('../services');
const { HttpCode } = require('../helpers/constants');

const serviceUser = new UsersService();
const serviceAuth = new AuthService();

const reg = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await serviceUser.findByEmail(email);

  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'This email is alredy use',
    });
  }

  try {
    const newUser = await serviceUser.create({ email, password, subscription });
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await serviceAuth.login({ email, password });

    if (token) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { token },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: 'Invalid creadentials',
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;

  await serviceAuth.logout(id);

  return res.status(HttpCode.NO_CONTENT).json({
    status: 'success',
    code: HttpCode.NO_CONTENT,
  });
};

module.exports = {
  reg,
  login,
  logout,
};
