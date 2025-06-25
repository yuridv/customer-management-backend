const { Errors, Validate } = require('../../utils/functions');
const Client = require('../../models/client');

const route = async(req, res) => {
  try {
    await Validate(req.body, {
      name: { type: 'string', required: true },
      cpf: { type: 'cpf', required: true },
      phone: { type: 'phone', required: true },
      email: { type: 'email', required: true },
      birthday: { type: 'date', required: true }
    });

    const client = new Client({ ...req.body, user: req.login._id });
    await client.save();

    return { status: 201, message: 'O cliente foi cadastrado com sucesso!', client };
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