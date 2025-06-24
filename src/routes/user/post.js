const { Errors, Validate } = require('../../utils/functions');
const User = require('../../models/user');

const route = async(req, res) => {
  try {
    await Validate(req.body, {
      email: { type: 'email', required: true },
      password: { type: 'string', required: true },
      name: { type: 'string', required: true },
      role: { type: 'string', equal: [ 'USER', 'ADMIN' ], required: true }
    });

    if (req.login.role !== 'ADMIN') return { status: 403, error: 'Você não possui permissão para acessar esse endpoint...' };

    if (req.files?.avatar?.data) {
      req.body.avatar = `data:${req.files.avatar.mimetype};base64` + Buffer.from(req.files.avatar.data).toString('base64');
    }

    const user = new User(req.body);
    await user.save();

    const userData = user.toObject();
    delete userData.password;

    return { status: 201, message: 'O usuário foi cadastrado com sucesso!', user: userData };
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