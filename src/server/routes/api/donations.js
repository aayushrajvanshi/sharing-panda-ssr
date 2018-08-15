const Donation = require('../../models/Donation');
const Fundraiser = require('../../models/Fundraiser');
const User = require('../../models/User');

module.exports = (router) => {
    router.get('/donations', function (req, res) {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        Donation.getDonations(function (err, donations) {
            if (err) {
                throw err;
            }
            res.json(donations);
        }, limit, page)
    });
    router.post('/donations', function (req, res, next) {
        let donation = new Donation({
            amount: req.body.amount,
            donor: req.body.user_id,
            fundraiser: req.body.fundraiser_id
        });
        Donation.addDonation(donation, function (err, donation) {
            if (err) throw err;
            let user_id = donation.donor;
            let fundraiser_id = donation.fundraiser;
            let update = { $push: { donations: donation } }
            Fundraiser.getFundraiserByIdAndUpdate(fundraiser_id, update, function (err, fundraiser) {
                if (err) throw err;
            });
            User.getUserByIdAndUpdate(user_id, update, function (err, user) {
                if (err) throw err;
            });
            res.json(donation)
        })
    });
    router.get('/donations/:id', function (req, res) {
        let donation_id = req.params.id;
        Donation.getDonationById(donation_id, function (err, donation) {
            if (err) {
                throw err;
            }
            if (donation) {
                res.json(donation);
            }
            else res.json({});
        })
    });
}
