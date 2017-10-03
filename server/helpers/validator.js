"use strict";
const assert = require("assert");

module.exports.assertParamType = (value, expectedType, paramName) => {
    assert.equal(typeof (value), expectedType, `parameter "${paramName}" must be ${expectedType}`);
};

module.exports.assertNotEmpty = (value, paramName) => {
    assert.ok(value, `parameter "${paramName}" can't be empty`);
};

module.exports.assertNonEmptyString = (value, paramName) => {
    this.assertParamType(value, 'string', paramName);
    this.assertNotEmpty(value, paramName);
};

module.exports.assertIsOneOfValidValues = (value, validValues, paramName) => {
    assert.notEqual(validValues.indexOf(value), -1,
        `parameter "${paramName}" has to be one of [ ${validValues.map(v => `"${v}"`).join(', ')} ]`
    );
}