import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Start App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Show login title', () => {
    page.navigateTo();
    expect(page.getTitleText('#title-app')).toEqual('ADI Gamer');
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
