const fs = require('fs');
const path = require('path');

module.exports = (router) => {
  router.get('/healthcheck', function (req, res) {
    res.json({ "message": "ok" })
  });

  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(router);
  });
};
