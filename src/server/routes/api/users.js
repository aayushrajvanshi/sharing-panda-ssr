const User = require('../../models/User');

module.exports = (router) => {
    router.get('/users', function (req, res) {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        User.getUsers(function (err, users) {
            if (err) {
                throw err;
            }
            res.json(users);
        }, limit, page)
    });
    router.get('/users/:id', function (req, res) {
        User.getUserById(req.params.id, function (err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                res.json(user);
            }
            else res.json({});
        })
    });
    router.post('/users', function (req, res) {
        let user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })
        User.addUser(user, function (err, user) {
            if (err) {
                throw err;
            }
            res.json(user);
        })
    })
}