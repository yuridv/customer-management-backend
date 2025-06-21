const { Errors } = require('../utils/functions');

const middleware = async(req, res, next) => {
  try {
    req.login = {};
    next();
  } catch(err) {
    return Errors(err, __filename)
      .then(() => middleware(req, res, next))
      .catch((e) => res.status(e.status || 500).send(e));
  }
};

module.exports = middleware;