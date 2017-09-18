"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Document = require('../models/document');

const absoluteDocumentId = function (req, document)  {
    return req.protocol + '://' + req.get('host') + '/api/documents/' + document.id;
};


router.get('/', auth.loggedInAngel, (req, res) => {
    Document.all().then(documents => {
        const jsonDocuments = documents.map(document => {
            document.href = absoluteDocumentId(req, document);
            return document;
        });
        res.json(jsonDocuments);
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.post('/', auth.loggedInAdmin, (req, res) => {
    if(req.body.type !== 'file') {
        res.status(501).json({status: 501, message: 'Support for other document types than "file" not implemented.'});
        return;
    }

    Document.create(req.body).then((document) => {
        document.href = absoluteDocumentId(req, document);
        res.status(201).json(document);
    }).catch((err) => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.get('/:documentId', auth.loggedInAngel, (req, res) => {
    Document.get(req.params.documentId).then(document => {
        if (!document) {
            res.status(404).json({status: 404, message: 'Document not found'});
        } else {
            document.href = absoluteDocumentId(req, document);
            res.json(document);
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.put('/:documentId', auth.loggedInAdmin, (req, res) => {
    let document = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            document[key] = req.body[key];
        }
    }
    document.id = req.params.documentId;

    Document.update(document).then(() => {
        res.json({status: 200, message: 'Updated'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

router.delete('/:documentId', auth.loggedInAdmin, (req, res) => {
    Document.delete(req.params.documentId).then(() => {
        res.json({status: 200, message: 'Deleted'});
    }).catch(err => {
        console.error(err);
        res.status(500).json({status: 500, message: err});
    });
});

module.exports = router;