const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
    amount: {
        type: Number
    },
    donor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fundraiser: {
        type: Schema.Types.ObjectId,
        ref: 'Fundraiser'
    }
});


DonationSchema.plugin(mongoosePaginate);

const Donation = module.exports = mongoose.model('Donation', DonationSchema);

//Get List of Donations
module.exports.getDonations = function (callback, limit, page) {
    let query = {}; 
    let options = {
        // populate: ['donor', 'fundraiser'],
        limit: limit || 50,
        page: page || 1
    }
    Donation.paginate(query, options, callback);
}

//Get Donations By Id
module.exports.getDonationById = function (id, callback) {
    Donations.findById(id, callback)
        .populate({ path: 'donor' })
        .populate({ path: 'fundraiser' })
}

//Add Donation
module.exports.addDonation = function (donation, callback) {
    donation.save(callback);
}
