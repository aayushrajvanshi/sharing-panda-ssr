const Petition = require('../../models/Petition');
const User = require('../../models/User');

module.exports = (router) => {
    router.get('/petitions', function (req, res) {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        Petition.getPetitions(function (err, petitions) {
            if (err) {
                throw err;
            }
            res.json(petitions);
        }, limit, page)
    });
    router.post('/petitions', function (req, res, next) {
        let petition = new Petition({
            title: req.body.title,
            description: req.body.description,
            author: req.body.user_id
        });
        Petition.addPetition(petition, function (err, petition) {
            if (err) throw err;
            let user_id = petition.author;
            let update = { $push: { petitions: petition } }
            User.getUserByIdAndUpdate(user_id, update, function (err, user) {
                if (err) throw err;
            });
            res.json(petition);
        })
    });
    router.get('/petitions/:id', function (req, res) {
        let petition_id = req.params.id;
        Petition.getPetitionById(petition_id, function (err, petition) {
            if (err) {
                throw err;
            }
            if (petition) {
                res.json(petition);
            }
            else res.json({});
        })
    });
    router.post('/petitions/:id', function (req, res) {
        let petition_id = req.params.id;
        let signee = req.body.user_id;
        let update = { $push: { signers: signee } }
        Petition.getPetitionByIdAndUpdate(petition_id, update, function (err, petition) {
            if (err) throw err;
            let update = { $push: { signed_petitions: petition } }
            User.getUserByIdAndUpdate(signee, update, function (err, user) {
                if (err) throw err;
            })
            res.json(petition);
        });
    });
}
