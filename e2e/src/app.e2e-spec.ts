import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('When starting the application', () => {

  const page = new AppPage();

  describe('The AppModule is compiled', () => {

    beforeAll(() => page.navigateTo());

    it('Should redirect to login', () => {
      const title = element(by.css('#title-app')).getText();
      expect(title).toEqual('ADI Gamer');
    });

    it('Should create the form', () => {
      const inputDocument = element(by.css('input[formcontrolname="document"]'));
      const inputPassword = element(by.css('input[formcontrolname="password"]'));
      const btnLogin = element(by.css('#btn-login'));

      expect(inputDocument).toBeDefined();
      expect(inputPassword).toBeDefined();
      expect(btnLogin).toBeDefined();
    });
  });

  describe('The User login', () => {

    it('Should must ask for the mandatory data', () => {
      const btnLogin = element(by.css('#btn-login'));
      btnLogin.click();

      const errorDocument = element(by.css('#err-document-requerid'));
      const errorPassword = element(by.css('#err-document-requerid'));
      expect(errorDocument.getText()).toEqual('El campo es obligatorio');
      expect(errorPassword.getText()).toEqual('El campo es obligatorio');
    });

    it('Should show data error', () => {
      const inputDocument = element(by.css('input[formcontrolname="document"]'));
      const inputPassword = element(by.css('input[formcontrolname="password"]'));
      const btnLogin = element(by.css('#btn-login'));
      inputDocument.value = '1017249864';
      inputPassword.value = '2222221';
      btnLogin.click();

      const errorData = element(by.css('#error-data'));
      expect(errorData).toBeDefined();
    });

    it('Should log in', () => {
      const inputDocument = element(by.css('input[formcontrolname="document"]'));
      const inputPassword = element(by.css('input[formcontrolname="password"]'));
      const btnLogin = element(by.css('#btn-login'));
      inputDocument.value = '1017249864';
      inputPassword.value = '2222222';
      btnLogin.click();

      const navbar = element(by.css('#navbar-app'));
      expect(navbar).toBeDefined();
    });
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
