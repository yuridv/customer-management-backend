const route = async() => {
  return { status: 200, message: 'Hello World' };
};

module.exports = { 
  route, 
  method: 'GET'
};