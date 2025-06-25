const { Errors, Validate } = require('../../utils/functions');
const Client = require('../../models/client');

const route = async(req, res) => {
  try {
    await Validate(req.query, {
      id: { type: 'string', required: true }
    });

    await Validate(req.body, {
      name: { type: 'string' },
      cpf: { type: 'cpf' },
      phone: { type: 'phone' },
      email: { type: 'email' },
      birthday: { type: 'date' },
      status: { type: 'string', equal: [ 'IN_PROGRESS', 'FINISHED', 'PENDING', 'CANCELED' ] },
      user: { type: 'string' }
    });

    const client = await Client.findById(req.query.id);
    if (!client) return { status: 404, error: 'Não existe nenhum cliente vinculado a esse ID...' };

    if (req.login.role !== 'ADMIN') {
      if (!client.user.equals(req.login._id)) return { status: 403, error: 'Você não tem permissão para alterar os dados desse cliente...' };
      delete req.body.user;
    }

    client.set(req.body);
    await client.save();

    return { status: 200, message: 'Os dados do cliente foi alterado com sucesso!', client };
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