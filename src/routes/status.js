const route = async(req, res) => {
  return { status: 200, message: 'Hello World' };
};

module.exports = { 
  route, 
  method: 'GET'
};