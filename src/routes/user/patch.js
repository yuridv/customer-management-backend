const { Errors, Validate } = require('../../utils/functions');
const User = require('../../models/user');

const route = async(req, res) => {
  try {
    await Validate(req.query, {
      id: { type: 'string', required: true }
    });

    if (req.login.role !== 'ADMIN') return { status: 403, error: 'Você não possui permissão para acessar esse endpoint...' };

    await Validate(req.body, {
      email: { type: 'email' },
      password: { type: 'string' },
      name: { type: 'string' },
      role: { type: 'string', equal: [ 'USER', 'ADMIN' ] },
      status: { type: 'number', equal: [ 0, 1 ] }
    });

    const user = await User.findById(req.query.id);
    if (!user) return { status: 404, error: 'Não foi encontrado nenhum usuário vinculado a esse ID...' };

    user.set({ ...req.body });
    await user.save();

    const userData = user.toObject();
    delete userData.password;

    return { status: 200, message: 'Os dados do usuário foi alterado com sucesso!', user: userData };
  } catch(err) {
    return Errors(err, __filename)
      .then(() => route(req, res))
      .catch((e) => e);
  }
};

module.exports = { 
  route, 
  method: 'PATCH'
};