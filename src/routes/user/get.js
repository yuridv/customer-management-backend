const { Errors, Validate } = require('../../utils/functions');
const User = require('../../models/user');

const route = async(req, res) => {
  try {
    await Validate(req.query, {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string', equal: [ 'USER', 'ADMIN' ] },
      status: { type: 'number', equal: [ 0, 1 ] },

      page: { type: 'number', min: 1, default: 1 },
      limit: { type: 'number', min: 1, default: 10 }
    });

    const query = {};
    if (req.query.id) query._id = req.query.id;
    if (req.query.name) query.name = { $regex: req.query.name, $options: 'i' };
    if (req.query.email) query.email = { $regex: req.query.email, $options: 'i' };
    if (req.query.role) query.role = req.query.role;
    if (req.query.status || req.query.status === 0) query.status = req.query.status;

    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * req.query.limit;

    let users = await User.find(query)
      .skip(skip)
      .limit(req.query.limit)
      .sort({ createdAt: -1 });

    if (req.login.role !== 'ADMIN') users = users.map((user) => ({ _id: user._id, name: user.name }));

    const count = await User.countDocuments(query);
    const total = Math.ceil(count / req.query.limit);

    return {
      status: 200,
      users,
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