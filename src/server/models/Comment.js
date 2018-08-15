const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String
    },
    comment_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    commentor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isReply: {
        type: Schema.Types.Boolean,
        default: false
    },
    fundraiser: {
        type: Schema.Types.ObjectId,
        ref: 'Fundraiser'
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

CommentSchema.plugin(mongoosePaginate);

const Comment = module.exports = mongoose.model('Comment', CommentSchema);

//Get List of Comments
module.exports.getComments = function (callback, limit, page) {
    let query = {}; //by default everything
    let options = {
        // populate: { path: 'replies' },
        limit: limit || 50,
        page: page || 1
    }
    Comment.paginate(query, options, callback);
}

//Get Comment By Id
module.exports.getCommentById = function (id, callback) {
    Comment.findById(id, callback)
        .populate({
            path: 'replies',
            model: 'Comment',
            populate: {
                path: 'replies',
                model: 'Comment'
            }
        })
}

//Get Comment By Id And Update
module.exports.getCommentByIdAndUpdate = function (id, update, callback) {
    Comment.findByIdAndUpdate(id, update, callback)
}

//Add Comment
module.exports.addComment = function (comment, callback) {
    comment.save(callback);
}
