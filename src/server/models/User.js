const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address: {
        type: String,
        default: ''
    },
    country_code: {
        type: String,
        default: 'IN'
    },
    mobile_number: {
        type: String,
        default: ''
    },
    email_id: {
        type: String
    },
    admin: Boolean,
    meta: {
        age: {
            type: Number
        }
    },
    fundraisers: [{
        type: Schema.Types.ObjectId,
        ref: 'Fundraiser'
    }],
    donations: [{
        type: Schema.Types.ObjectId,
        ref: 'Donation'
    }],
    petitions: [{
        type: Schema.Types.ObjectId,
        ref: 'Petition'
    }],
    signed_petitions: [{
        type: Schema.Types.ObjectId,
        ref: 'Petition'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

UserSchema.plugin(mongoosePaginate);

const User = module.exports = mongoose.model('User', UserSchema);

//Get List of Users
module.exports.getUsers = function (callback, limit, page) {
    let query = {};
    let options = {
        // populate: { path: 'fundraisers' },
        limit: limit || 10,
        page: page || 1
    }
    User.paginate(query, options, callback);
}

//Get User By Id
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
        .populate([{
            select: 'title description-_id',
            path: 'fundraisers',
            model: 'Fundraiser'
        }, {
            select: 'amount-_id',
            path: 'donations',
            model: 'Donation'
        }, {
            select: 'title description-_id',
            path: 'petitions',
            model: 'Petition'
        }])
}

//Get User By Id And Update
module.exports.getUserByIdAndUpdate = function (id, update, callback) {
    User.findByIdAndUpdate(id, update, callback)
}

//Add User

module.exports.addUser = function (user, callback) {
    user.save(callback);
}