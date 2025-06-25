const { Errors, Validate } = require('../../utils/functions');
const Client = require('../../models/client');

const route = async(req, res) => {
  try {
    await Validate(req.query, {
      id: { type: 'string', required: true }
    });

    if (req.login.role !== 'ADMIN') return { status: 403, error: 'Você não tem permissão para apagar os dados desse cliente...' };

    const client = await Client.findById(req.query.id);
    if (!client) return { status: 404, error: 'Não existe nenhum cliente vinculado a esse ID...' };

    const deleted = await Client.findByIdAndDelete(req.query.id);
    if (!deleted) return { status: 404, error: 'Não foi possível apagar os dados desse cliente...' };

    return { status: 200, message: 'O cliente foi apagado com sucesso!', client };
  } catch(err) {
    return Errors(err, __filename)
      .then(() => route(req, res))
      .catch((e) => e);
  }
};

module.exports = { 
  route, 
  method: 'DELETE'
};