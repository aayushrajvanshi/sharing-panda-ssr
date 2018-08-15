const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const PetitionSchema = new Schema({
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
    signers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});


PetitionSchema.plugin(mongoosePaginate);

const Petition = module.exports = mongoose.model('Petition', PetitionSchema);

//Get List of Petitions
module.exports.getPetitions = function (callback, limit, page) {
    let query = {}; //by default everything
    let options = {
        populate: ['donor', 'fundraiser'],
        limit: limit || 50,
        page: page || 1
    }
    Petition.paginate(query, options, callback);
}

//Get Petitions By Id
module.exports.getPetitionById = function (id, callback) {
    Petition.findById(id, callback)
        .populate({ path: 'donor' })
        .populate({ path: 'fundraiser' })
}

//Get Petition By Id And Update
module.exports.getPetitionByIdAndUpdate = function (id, update, callback) {
    Petition.findByIdAndUpdate(id, update, callback)
}

//Add Petition
module.exports.addPetition = function (Petition, callback) {
    Petition.save(callback);
}
