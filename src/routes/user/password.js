const { Errors, Validate } = require('../../utils/functions');
const User = require('../../models/user');

const route = async(req, res) => {
  try {
    await Validate(req.body, {
      actualPassword: { type: 'string', required: true },
      newPassword: { type: 'string', required: true },
      repeatPassword: { type: 'string', required: true }
    });

    const user = await User.findById(req.login._id)
      .select('+password');
    if (!user) return { status: 404, error: 'Não foi encontrado nenhum usuário vinculado a esse ID...' };

    const isValid = await user.isValidPassword(req.body.actualPassword);
    if (!isValid) return { status: 403, error: 'A sua senha atual é invalida...' };

    if (req.body.newPassword !== req.body.repeatPassword) return { status: 403, error: 'A senha repetida não corresponde com sua nova senha...' };

    if (req.body.actualPassword === req.body.newPassword) return { status: 403, error: 'A sua nova senha não pode ser igual a sua senha atual...' };

    user.set({
      password: req.body.newPassword,
      token: null
    });

    const updated = await user.save();
    if (!updated) return { status: 500, error: 'Não foi possível alterar os dados desse usuário...' };

    return { status: 200, message: 'A sua senha foi alterada com sucesso!', user: updated };
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