"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const documentService = require('../services/document-service');
const validator = require('../helpers/validator');

const SUPPORTED_DOCUMENT_TYPES = ['file', 'folder'];

router.get('/', auth.requireScopes(['read:documents']), async (req, res, next) => {
    try {
       res.json(await documentService.listAllDocuments());
    } catch (err) {
        next(err);
    }
});

router.post('/', auth.requireScopes(['write:documents']), async (req, res, next) => {
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
        next(err);
    }
});

router.get('/:documentId', auth.requireScopes(['read:documents']), async (req, res, next) => {
    try {
        res.json(await documentService.getDocumentById(req.params.documentId));
    } catch (err) {
        next(err);
    }
});

router.put('/:documentId', auth.requireScopes(['write:documents']), async (req, res, next) => {
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
        next(err);
    }
});

router.delete('/:documentId', auth.requireScopes(['write:documents']), async (req, res, next) => {
    try {
        await documentService.deleteDocument(req.params.documentId);
        res.json({status: 200, message: 'Deleted'});
    } catch (err) {
        next(err);
    }
});

router.get('/:documentId/children', auth.requireScopes(['read:documents']), async (req, res, next) => {
    try {
        res.json(await documentService.listAllDocumentsWithParent(req.params.documentId));
    } catch (err) {
        next(err);
    }
});

module.exports = router;