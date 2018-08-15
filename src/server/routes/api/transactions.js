const Donation = require('../../models/Donation');

module.exports = (router) => {
    router.get('/transactions', function (req, res) {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        Donation.getDonations(function (err, donations) {
            if (err) {
                throw err;
            }
            res.json(donations);
        }, limit, page)
    });
}
