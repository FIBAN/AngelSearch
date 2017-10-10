"use strict";
const Document = require('../daos/document');
const assert = require("assert");
const VError = require('verror').VError;

const documentNotFoundError = (documentId) => new VError({
        name: 'DOCUMENT_NOT_FOUND',
        info: {documentId: documentId}
    }, `no document found with id "${documentId}"`
);

module.exports.listAllDocuments = async () => {
    try {
        return await Document.all();
    } catch (err) {
        throw new VError(err, 'failed to get documents');
    }
};

module.exports.listAllDocumentsWithParent = async (parentId) => {
    try {
        return await Document.allWithParent(parentId);
    } catch (err) {
        throw new VError(err, 'failed to get documents for parent');
    }
};

module.exports.getDocumentById = async (documentId) => {
    let document;
    try {
        document = await Document.get(documentId);
    } catch (err) {
        throw new VError(err, 'failed to get document');
    }
    if(!document) throw documentNotFoundError(documentId);
    return document;
};

module.exports.createDocument = async (document) => {
    try {
        return await Document.create(document);
    } catch (err) {
        throw new VError(err, 'failed to create new document');
    }
};

module.exports.updateDocument = async (changes) => {
    assert.equal(typeof (changes.id), 'string', 'document id must be defined');

    let updatedDocument;
    try {
        updatedDocument =  await Document.update(changes);
    } catch (err) {
        throw new VError(err, 'failed to update document');
    }
    if(!updatedDocument) throw documentNotFoundError(changes.id);
    return updatedDocument;
};

module.exports.deleteDocument = async (documentId) => {
    let rowsDeleted;
    try {
        rowsDeleted = await Document.delete(documentId);
    } catch (err) {
        throw new VError(err, 'failed to delete document');
    }
    if(!rowsDeleted) throw documentNotFoundError(documentId);
};