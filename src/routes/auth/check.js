const { Errors } = require('../../utils/functions');

const route = async(req, res) => {
  try {
    return { status: 200, message: 'O seu token está valido e autenticado...', user: req.login };
  } catch(err) {
    return Errors(err, __filename)
      .then(() => route(req, res))
      .catch((e) => e);
  }
};

module.exports = { 
  route, 
  method: 'GET'
};