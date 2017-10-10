'use strict';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('services/document-service.js', () => {
    const fakeDocumentDao = {};
    const mockDocumentDao = sinon.mock(fakeDocumentDao);
    const DocumentService = proxyquire('../../../services/document-service', {'../daos/document': fakeDocumentDao});

    const testDocuments = [{
        id: 'one',
        name: 'test document',
        download_url: 'http://example.com/file.txt',
        type: 'file',
        parent: null
    }, {
        id: 'two',
        name: 'another document',
        download_url: 'http://example.com/something.txt',
        type: 'file',
        parent: null
    }, {
        id: 'three',
        name: 'good stuff',
        type: 'folder',
        parent: null
    }, {
        id: 'four',
        name: 'best thing ever',
        download_url: 'http://example.com/best.txt',
        type: 'file',
        parent: 'three'
    }, {
        id: 'five',
        name: 'puppie picture',
        download_url: 'http://example.com/puppies.txt',
        type: 'file',
        parent: 'three'
    }];

    describe('listAllDocuments', () => {

        it('should return all documents', async () => {
            const mockExpectation = mockDocumentDao.expects('all').resolves(testDocuments).once();

            const documents =  await DocumentService.listAllDocuments();

            expect(documents).to.equal(testDocuments);
            mockExpectation.verify();
        });

        it('should throw error if something goes wrong', async () => {
            const mockExpectation = mockDocumentDao.expects('all').throws(new Error('TEST_ERROR')).once();

            try {
                await DocumentService.listAllDocuments();
                expect.fail();
            } catch (err) {
                expect(err.message).to.equal('failed to get documents: TEST_ERROR')
            }
            mockExpectation.verify();

        });
    });

    describe('listAllDocumentsWithParent', () => {

        it('should return all documents with parent', async () => {
            const documentsWithParent = testDocuments.filter(d => d.parent === 'three');
            const mockExpectation = mockDocumentDao.expects('allWithParent').withArgs('three').resolves(documentsWithParent).once();

            const documents =  await DocumentService.listAllDocumentsWithParent('three');

            expect(documents).to.equal(documentsWithParent);
            mockExpectation.verify();
        });

        it('should throw error if something goes wrong', async () => {
            const mockExpectation = mockDocumentDao.expects('allWithParent').withArgs('three').throws(new Error('TEST_ERROR')).once();

            try {
                await DocumentService.listAllDocumentsWithParent('three');
                expect.fail();
            } catch (err) {
                expect(err.message).to.equal('failed to get documents for parent: TEST_ERROR')
            }
            mockExpectation.verify();

        });
    });

    describe('getDocumentById', () => {

        it('should return document with same id', async () => {
            const mockExpectation = mockDocumentDao.expects('get').withArgs('one').resolves(testDocuments[0]).once();

            const document = await DocumentService.getDocumentById('one');

            expect(document).to.equal(testDocuments[0]);
            mockExpectation.verify();
        });

        it('should throw not found error if no document exists', async () => {
            const mockExpectation = mockDocumentDao.expects('get').withArgs('two').resolves(null).once();

            try {
                await DocumentService.getDocumentById('two');
                expect.fail();
            } catch (err) {
                expect(err.name).to.equal('DOCUMENT_NOT_FOUND');
                expect(err.message).to.equal('no document found with id "two"');
            }
            mockExpectation.verify();
        });

        it('should throw error if something goes wrong', async () => {
            const mockExpectation = mockDocumentDao.expects('get').withArgs().throws(new Error('TEST_ERROR')).once();

            try {
                await DocumentService.getDocumentById();
                expect.fail();
            } catch (err) {
                expect(err.message).to.equal('failed to get document: TEST_ERROR')
            }
            mockExpectation.verify();

        });
    });

    describe('createDocument', () => {
        it('should return newly created document', async () => {
            const mockExpectation = mockDocumentDao.expects('create').withArgs(testDocuments[0]).resolves(testDocuments[0]).once();

            const document =  await DocumentService.createDocument(testDocuments[0]);

            expect(document).to.equal(testDocuments[0]);
            mockExpectation.verify();
        });

        it('should throw error if something goes wrong', async () => {
            const mockExpectation = mockDocumentDao.expects('create').throws(new Error('TEST_ERROR')).once();

            try {
                await DocumentService.createDocument();
                expect.fail();
            } catch (err) {
                expect(err.message).to.equal('failed to create new document: TEST_ERROR')
            }
            mockExpectation.verify();

        });
    });

    describe('updateDocument', () => {
        it('should return updated document', async () => {
            const changesParam = {id: 'one', name: 'test document'};
            const mockExpectation = mockDocumentDao.expects('update').withArgs(changesParam).resolves(testDocuments[0]).once();

            const document =  await DocumentService.updateDocument(changesParam);

            expect(document).to.equal(testDocuments[0]);
            mockExpectation.verify();
        });

        it('should throw error if something goes wrong', async () => {
            const changesParam = {id: 'one', name: 'test document'};
            const mockExpectation = mockDocumentDao.expects('update').withArgs(changesParam).throws(new Error('TEST_ERROR')).once();

            try {
                await DocumentService.updateDocument(changesParam);
                expect.fail();
            } catch (err) {
                expect(err.message).to.equal('failed to update document: TEST_ERROR')
            }
            mockExpectation.verify();

        });

        it('should throw error if id is not specified', async () => {
            const changesParam = { name: 'test document'};

            try {
                await DocumentService.updateDocument(changesParam);
                expect.fail();
            } catch (err) {
                expect(err.message).to.equal('document id must be defined')
            }

        });

        it('should throw not found error if no document exists', async () => {
            const changesParam = { id: 'two', name: 'test document'};
            const mockExpectation = mockDocumentDao.expects('update').withArgs(changesParam).resolves(null).once();

            try {
                await DocumentService.updateDocument(changesParam);
                expect.fail();
            } catch (err) {
                expect(err.name).to.equal('DOCUMENT_NOT_FOUND');
                expect(err.message).to.equal('no document found with id "two"');
            }
            mockExpectation.verify();
        });
        
    });

    describe('deleteDocument', () => {
        it('should delete the document', async () => {
            const mockExpectation = mockDocumentDao.expects('delete').withArgs('one').resolves(1).once();

            await DocumentService.deleteDocument('one');

            mockExpectation.verify();
        });

        it('should throw error if something goes wrong', async () => {
            const mockExpectation = mockDocumentDao.expects('delete').withArgs('one').throws(new Error('TEST_ERROR')).once();

            try {
                await DocumentService.deleteDocument('one');
                expect.fail();
            } catch (err) {
                expect(err.message).to.equal('failed to delete document: TEST_ERROR')
            }
            mockExpectation.verify();

        });

        it('should throw not found error if no document exists', async () => {
            const mockExpectation = mockDocumentDao.expects('delete').withArgs('two').resolves(0).once();

            try {
                await DocumentService.deleteDocument('two');
                expect.fail();
            } catch (err) {
                expect(err.name).to.equal('DOCUMENT_NOT_FOUND');
                expect(err.message).to.equal('no document found with id "two"');
            }
            mockExpectation.verify();
        });
    });

});