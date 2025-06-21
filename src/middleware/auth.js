const jwt = require('jsonwebtoken');

const { Errors } = require('../utils/functions');
const { auth } = require('../utils/bases');
const User = require('../models/user');

const middleware = async(req, res, next) => {
  try {
    Object.defineProperty(req, 'query', {
      value: Object.fromEntries(Object.entries(req.query)),
      writable: true,
      configurable: true,
      enumerable: true
    });

    if (auth.ignore.find((endpoint) => endpoint === `${req.path}/${req.method}`)) {
      req.login = {};
      return next();
    }

    const token = req.headers.authorization?.replace('Bearer ','');
    if (!token) return res.status(401).json({ error: 'O token não foi informado...' });

    const decode = jwt.verify(token, process.env.CRYPTOGRAPHY_KEY, (err, success) => {
      if (err) return { error: 'O token informado é invalido...' };
      return success;
    });
    if (decode.error) return res.status(401).send(decode);

    const user = await User
      .findOne({ email: decode.email });
    if (!user) return res.status(401).json({ error: 'O seu usuário não foi encontrado dentro do sistema...' });

    req.login = user.toObject();
    if (req.login.status !== 1) return res.status(403).json({ error: 'O seu usuário foi desativado por algum Administrador...' });

    next();
  } catch(err) {
    return Errors(err, __filename)
      .then(() => middleware(req, res, next))
      .catch((e) => res.status(e.status || 500).send(e));
  }
};

module.exports = middleware;