const jwt = require('jsonwebtoken');

const secret = 'my-lectures';

module.exports = (email) => {
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};
