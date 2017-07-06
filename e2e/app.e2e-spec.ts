import { AngelSearchPage } from './app.po';

describe('angel-search App', () => {
  let page: AngelSearchPage;

  beforeEach(() => {
    page = new AngelSearchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
