const express = require('express');
const router = express.Router();
const Angel = require('../models/angel');
const auth = require('../middleware/auth');

const absoluteAngelId = function (req, angel)  {
    return req.protocol + '://' + req.get('host') + '/api/angels/' + angel.id;
};

router.get('/', (req, res) => {

    Angel.all().then(rows => {
        rows = rows.map(a => (a.href = absoluteAngelId(req, a)) && a);
        res.json(rows);
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});

router.post('/', (req, res) => {

    Angel.create(req.body, (err) => {
        if(err) {
            console.error(err);
            res.status(500).json({status: 500, message: err});
        } else {
            res.status(201).json({status: 201, message: 'Created'});
        }
    });

});

router.get('/:angelId', (req, res) => {

    Angel.get(req.params.angelId).then(row => {
        if (!row) {
            res.status(404).json({status: 404, message: 'Angel not found'});
        } else {
            row.href = absoluteAngelId(req, row);
            res.json(row);
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});



router.put('/:angelId', auth.loggedIn, auth.canModify, (req, res) => {

    let angel = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            angel[key] = req.body[key];
        }
    }
    angel.id = req.params.angelId;
    Angel.update(angel).then(() => {
        res.json({status: 200, message: 'Updated'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });

});

router.delete('/:angelId', auth.loggedIn, auth.canModify, (req, res) => {

    Angel.delete(req.params.angelId).then(() => {
        res.json({status: 200, message: 'Deleted'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});



module.exports = router;