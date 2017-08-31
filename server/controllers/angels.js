const express = require('express');
const router = express.Router();
const Angel = require('../models/angel');
const Invitation = require('../models/invitation');
const Industry = require('../models/industry');
const auth = require('../middleware/auth');

const absoluteAngelId = function (req, angel)  {
    return req.protocol + '://' + req.get('host') + '/api/angels/' + angel.id;
};

const angelAccessDenied = function (res) {
    res.status(403).json({status: 403, message: "Forbidden"});
};

router.get('/', auth.loggedInAngel, (req, res) => {
    Promise.all([Angel.all(), Industry.all()]).then(results => {
        const angels = results[0];
        const industries = results[1];
        const jsonAngels = angels.map(a => {
            a.href = absoluteAngelId(req, a);
            a.industries = industries.filter(i => i.angel_id === a.id).map(i => i.industry);
            return a;
        });
        res.json(jsonAngels);
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.post('/', auth.loggedInAdmin, (req, res) => {
    Angel.create(req.body).then(() => {
        res.status(201).json({status: 201, message: 'Created'})
    }).catch((err) => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.get('/:angelId', auth.loggedInAngel, (req, res) => {
    Angel.get(req.params.angelId).then(angel => {
        if (!angel) {
            res.status(404).json({status: 404, message: 'Angel not found'});
        } else {
            angel.href = absoluteAngelId(req, angel);
            return Industry.allByAngelId(angel.id).then(industries => {
                angel.industries = industries.map(i => i.industry);
                res.json(angel);
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.put('/:angelId', auth.loggedInAngel, (req, res) => {
    if(req.angel.id !== req.params.angelId && req.user['https://angel-search/role'] !== 'admin') {
        angelAccessDenied(res);
        return;
    }

    let angel = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            angel[key] = req.body[key];
        }
    }
    angel.id = req.params.angelId;

    Angel.update(angel).then(() => {
        if(req.body.industries) {
            let newIndustries = req.body.industries;
            return Industry.allByAngelId(req.params.angelId).then(currentIndustries => {
                let changes = [];
                for(let i of currentIndustries) {
                    if(newIndustries.indexOf(i.industry) === -1) {
                        changes.push(Industry.delete(i.id));
                    }
                }
                for(let i of newIndustries) {
                    if(!currentIndustries.find(v => v.industry === i)) {
                        changes.push(Industry.create(req.params.angelId, i));
                    }
                }
                return Promise.all(changes).then(() => res.json({status: 200, message: 'Updated'}));
            })
        }
        else {
            res.json({status: 200, message: 'Updated'});
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.delete('/:angelId', auth.loggedInAdmin, (req, res) => {
    Angel.delete(req.params.angelId).then(() => {
        res.json({status: 200, message: 'Deleted'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.get('/:angelId/invitations', auth.loggedInAngel, (req, res) => {
    if(req.angel.id !== req.params.angelId && req.user['https://angel-search/role'] !== 'admin') {
        angelAccessDenied(res);
        return;
    }

    Invitation.allByAngelId(req.params.angelId).then((invites) => {
        res.json(invites);
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.post('/:angelId/invitations', auth.loggedInAdmin, (req, res) => {
    Invitation.create(req.params.angelId).then(() => {
        res.status(201).json({status: 201, message: 'Created'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

module.exports = router;