"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const documentService = require('../services/document-service');
const logger = require('../helpers/logger');
const validator = require('../helpers/validator');

const SUPPORTED_DOCUMENT_TYPES = ['file'];

router.get('/', auth.loggedInAngel, async (req, res) => {
    try {
       res.json(await documentService.listAllDocuments());
    } catch (err) {
        logger(req.headers['x-request-id']).error('List Documents', err);
        res.status(500).json({status: 500, message: err.message});
    }
});

router.post('/', auth.loggedInAdmin, async (req, res) => {
    try {
        const body = req.body;
        validator.assertNonEmptyString(body.name, 'name');
        validator.assertParamType(body.type, 'string', 'type');
        validator.assertIsOneOfValidValues(body.type, SUPPORTED_DOCUMENT_TYPES, 'type');
    } catch (err) {
        res.status(400).json({status: 400, message: err.message});
        return
    }

    try {
        res.status(201).json(await documentService.createDocument(req.body));
    } catch (err) {
        logger(req.headers['x-request-id']).error('New Document', err);
        res.status(500).json({status: 500, message: err.message});
    }
});

router.get('/:documentId', auth.loggedInAngel, async (req, res) => {
    try {
        res.json(await documentService.getDocumentById(req.params.documentId));
    } catch (err) {
        switch (err.name) {
            case 'DOCUMENT_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Get Document', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.put('/:documentId', auth.loggedInAdmin, async (req, res) => {
    let changes = {};
    for (let key in req.body) {
        if(req.body.hasOwnProperty(key)){
            changes[key] = req.body[key];
        }
    }
    changes.id = req.params.documentId;

    try {
        res.json(await documentService.updateDocument(changes));
    } catch (err) {
        switch (err.name) {
            case 'DOCUMENT_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Update Document', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

router.delete('/:documentId', auth.loggedInAdmin, async (req, res) => {
    try {
        await documentService.deleteDocument(req.params.documentId);
        res.json({status: 200, message: 'Deleted'});
    } catch (err) {
        switch (err.name) {
            case 'DOCUMENT_NOT_FOUND':
                res.status(404).json({status: 404, message: err.message});
                break;
            default:
                logger(req.headers['x-request-id']).error('Delete Document', err);
                res.status(500).json({status: 500, message: err.message});
        }
    }
});

module.exports = router;