const user = ''; //TODO: Add test account username
const password = ''; //TODO: Add test account password

const TIME_OUT = 5000;

module.exports = {

  'Load landing page' : function (browser) {
    browser
      .url('http://localhost:4200')
      .assert.title('Nordic Business Angels List')
      .waitForElementVisible('h1', TIME_OUT)
      .assert.containsText('h1', 'Nordic Business Angels List')
  },

  'Log in' : function (browser) {
    browser
      .url('http://localhost:4200')
      .waitForElementVisible('a.btn.btn-primary', TIME_OUT)
      .click('a.btn.btn-primary')
      .waitForElementVisible('input[name=email]', TIME_OUT)
      .setValue('input[name=email]', user)
      .waitForElementVisible('input[name=password]', TIME_OUT)
      .setValue('input[name=password]', password)
      .click('button.auth0-lock-submit')
      .waitForElementVisible('#angelTable', TIME_OUT)
      .end();
  }



};
