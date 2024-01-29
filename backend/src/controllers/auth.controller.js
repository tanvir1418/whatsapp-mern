const register = async (req, res, next) => {
  try {
    res.send(req.body);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
