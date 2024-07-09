const jwt = require('jsonwebtoken');

function authmiddlware(req, res, next){
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send('Unauthorized');
        }
        req.id = decoded.id;
       
        next();
      });
    } else {
      res.status(401).send('Unauthorized');
    }
  }

  module.exports = authmiddlware ;