// import jwt from 'jsonwebtoken';
// import authConfig from '../../config/auth.js';

// const authMiddlewar = (request, response, next) => {
//   const authToken = request.headers.authorization;
//   console.log('Token recebido:', authToken);

//   if (!authToken) {
//     return response.status(401).json({ error: 'Token not provided' });
//   }

//   const token = authToken.split(' ')[1];

//   try {
//     jwt.verify(token, authConfig.secret, (error, decoded) => {
//       if (error) {
//         throw Error();
//       }

//       request.userId = decoded.id;
//       request.userName = decoded.name;
//       request.userIsAdmin = decoded.admin;
//     });
//   } catch (_error) {
//     return response.status(401).json({ error: 'token is invalid' });
//   }

//   return next();
// };

// export default authMiddlewar;

import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const authMiddlewar = (request, response, next) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const token = authToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    request.userId = decoded.id;
    request.userName = decoded.name;
    request.userIsAdmin = decoded.admin;

    
  } catch (error) {
    console.log('Erro no jwt.verify:', error.message);
    return response.status(401).json({ error: 'token is invalid' });
  }

  return next();
};

export default authMiddlewar;