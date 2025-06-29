const { Errors } = require('../../utils/functions');
const Client = require('../../models/client');

const route = async(req, res) => {
  try {
    const query = {};

    if (req.login.role !== 'ADMIN') query.user = req.login._id;
    const total = await Client.countDocuments(query);

    query.status = 'IN_PROGRESS';
    const IN_PROGRESS = await Client.countDocuments(query);

    query.status = 'FINISHED';
    const FINISHED = await Client.countDocuments(query);

    query.status = 'PENDING';
    const PENDING = await Client.countDocuments(query);

    query.status = 'CANCELED';
    const CANCELED = await Client.countDocuments(query);

    return {
      status: 200, 
      count: { total, IN_PROGRESS, FINISHED, PENDING, CANCELED } 
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