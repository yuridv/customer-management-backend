const { Errors } = require('../utils/functions');

const middleware = async(err, req, res, next) => {
  try {
    res.status(500).json({ error: `O payload do request é inválido...\n${err.message}` });
  } catch(error) {
    return Errors(error, __filename)
      .then(() => middleware(err, req, res, next))
      .catch((e) => res.status(e.status || 500).send(e));
  }
};

module.exports = middleware;