const jwt = require('jsonwebtoken');
const { Errors, Validate, Data } = require('../../utils/functions');

const User = require('../../models/user');

const route = async(req, res) => {
  try {
    await Validate(req.body, {
      email: { required: true, type: 'email' },
      password: { required: true, type: 'string' }
    });

    const user = await User.findOne({ email: req.body.email })
      .select('+password');
    if (!user) return { status: 403, error: 'O usuário inserido não existe...' };

    const isValid = await user.isValidPassword(req.body.password);
    if (!isValid) return { status: 403, error: 'A senha inserida é invalida...' };

    if (user.status !== 1) return { status: 403, error: 'O seu usuário foi desativado por algum Administrador...' };

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.CRYPTOGRAPHY_KEY, { expiresIn: '3h' });

    return { status: 201, token, expiresIn: Data({ hours: 3 }) };
  } catch(err) {
    return Errors(err, __filename)
      .then(() => route(req, res))
      .catch((e) => e);
  }
};

module.exports = { 
  route, 
  method: 'POST'
};