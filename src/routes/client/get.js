const { Errors, Validate, Data } = require('../../utils/functions');
const Client = require('../../models/client');

const route = async(req, res) => {
  try {
    await Validate(req.query, {
      id: { type: 'string' },

      name: { type: 'string' },
      cpf: { type: 'cpf' },
      phone: { type: 'phone' },
      email: { type: 'string' },
      birthday: { type: 'date' },
      status: { type: 'string', equal: [ 'IN_PROGRESS', 'FINISHED', 'PENDING', 'CANCELED' ] },

      user: { type: 'string' },
      createdAt: { type: 'date' },
      
      page: { type: 'number', min: 1, default: 1 },
      limit: { type: 'number', min: 1, max: 50, default: 10 }
    });

    if (req.login.role !== 'ADMIN') req.query.user = req.login._id;

    const query = {};

    if (req.query.id) query._id = req.query.id;
    if (req.query.name) query.name = { $regex: req.query.name, $options: 'i' };
    if (req.query.cpf) query.cpf = req.query.cpf;
    if (req.query.phone) query.phone = req.query.phone;
    if (req.query.email) query.email = { $regex: req.query.email, $options: 'i' };
    if (req.query.status) query.status = req.query.status;
    if (req.query.user) query.user = req.query.user;

    if (req.query.birthday) {
      const start = Data({}, req.query.birthday);
      const end = Data({ days: +1 }, req.query.birthday);

      query.birthday = { $gte: start, $lte: end };
    }
    if (req.query.createdAt) {
      const start = Data({}, req.query.createdAt);
      const end = Data({ days: +1 }, req.query.createdAt);

      query.createdAt = { $gte: start, $lte: end };
    }

    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * req.query.limit;

    const clients = await Client.find(query)
      .skip(skip)
      .limit(req.query.limit)
      .sort({ createdAt: -1 });

    const count = await Client.countDocuments(query);
    const total = Math.ceil(count / req.query.limit);

    return {
      status: 200,
      clients,
      page: {
        current: page,
        total: total,
        count: count
      }
    };
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