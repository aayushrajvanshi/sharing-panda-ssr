const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const FundraiserSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    donations: [{
        type: Schema.Types.ObjectId,
        ref: 'Donation'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

FundraiserSchema.plugin(mongoosePaginate);

const Fundraiser = module.exports = mongoose.model('Fundraiser', FundraiserSchema);

//Get List of Fundraisers
module.exports.getFundraisers = function (callback, limit, page) {
    let query = {}; //by default everything
    let options = {
        // select: '-comments -donations',
        populate: [{
            select: 'first_name last_name-_id',
            path: 'author',
            model: 'User'
        }],
        limit: limit || 50,
        page: page || 1
    }
    Fundraiser.paginate(query, options, callback);
}

//Get Fundraiser By Id
module.exports.getFundraiserById = function (id, callback) {
    Fundraiser.findById(id, callback)
        .populate([{
            select: 'first_name last_name-_id',
            path: 'author',
            model: 'User'
        }, {
            select: 'text-_id',
            path: 'comments',
            model: 'Comment',
            populate: [{
                select: 'text-_id',
                path: 'replies',
                model: 'Comment',
                populate: {
                    select: 'text-_id',
                    path: 'replies',
                    model: 'Comment'
                }
            }]
        }, {
            select: 'amount-_id',
            path: 'donations',
            model: 'Donation',
            populate: [{
                select: 'first_name last_name-_id',
                path: 'donor',
                model: 'User'
            }]
        }])
}

//Get Fundraiser By Id And Update
module.exports.getFundraiserByIdAndUpdate = function (id, update, callback) {
    Fundraiser.findByIdAndUpdate(id, update, callback)
}

//Add Fundraiser
module.exports.addFundraiser = function (fundraiser, callback) {
    fundraiser.save(callback);
}
