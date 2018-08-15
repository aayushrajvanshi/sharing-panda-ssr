const User = require('../../models/User');
const Fundraiser = require('../../models/Fundraiser');
const Comment = require('../../models/Comment');

module.exports = (router) => {
    router.get('/comments', function (req, res) {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        Comment.getComments(function (err, comments) {
            if (err) {
                throw err;
            }
            res.json(comments);
        }, limit, page)
    });
    router.post('/comments', function (req, res, next) {
        let comment = new Comment({
            text: req.body.text,
            commentor: req.body.user_id,
            fundraiser: req.body.fundraiser_id
        });
        Comment.addComment(comment, function (err, comment) {
            if (err) throw err;
            let user_id = comment.commentor;
            let fundraiser_id = comment.fundraiser;
            let update = { $push: { comments: comment } }
            Fundraiser.getFundraiserByIdAndUpdate(fundraiser_id, update, function (err, fundraiser) {
                if (err) throw err;
            });
            User.getUserByIdAndUpdate(user_id, update, function (err, user) {
                if (err) throw err;
            });
            res.json(comment)
        })
    });
    router.get('/comments/:id', function (req, res) {
        let comment_id = req.params.id;
        Comment.getCommentById(comment_id, function (err, comment) {
            if (err) {
                throw err;
            }
            if (comment) {
                res.json(comment);
            }
            else res.json({});
        })
    });
    router.post('/comments/:id', function (req, res) {
        let comment_id = req.params.id;
        let comment = new Comment({
            text: req.body.text,
            commentor: req.body.user_id,
            fundraiser: req.body.fundraiser_id,
            isReply: true
        });
        Comment.addComment(comment, function (err, comment) {
            let update = { $push: { replies: comment } }
            Comment.getCommentByIdAndUpdate(comment_id, update, function (err, comment) {
                if (err) throw err;
                res.json(comment);
            });
        })
    });
}
