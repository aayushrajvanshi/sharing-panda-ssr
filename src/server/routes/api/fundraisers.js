const Fundraiser = require('../../models/Fundraiser');
const User = require('../../models/User');

module.exports = (router) => {
    router.get('/fundraisers', function (req, res) {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        Fundraiser.getFundraisers(function (err, fundraisers) {
            if (err) {
                throw err;
            }
            res.json(fundraisers);
        }, limit, page)
    });
    router.post('/fundraisers', function (req, res, next) {
        let fundraiser = new Fundraiser({
            title: req.body.title,
            description: req.body.description,
            author: req.body.user_id
        });
        Fundraiser.addFundraiser(fundraiser, function (err, fundraiser) {
            if (err) throw err;
            let user_id = fundraiser.author;
            let update = { $push: { fundraisers: fundraiser } }
            User.getUserByIdAndUpdate(user_id, update, function (err, user) {
                if (err) throw err;
                res.json(fundraiser)
            });
        })
    });
    router.get('/fundraisers/:id', function (req, res) {
        let id = req.params.id;
        Fundraiser.getFundraiserById(id, function (err, fundraiser) {
            if (err) {
                throw err;
            }
            if (fundraiser) {
                res.json(fundraiser);
            }
            else res.json({});
        })
    });
    router.put('/fundraisers/:id', function (req, res) {
        let id = req.params.id;
        let update = {
            title: req.body.title,
            description: req.body.description
        }
        Fundraiser.getFundraiserByIdAndUpdate(id, update, function (err, fundraiser) {
            if (err) throw err;
            res.json(fundraiser);
        })
    })
}
