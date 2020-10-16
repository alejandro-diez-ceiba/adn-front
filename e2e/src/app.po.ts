import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url = ''): Promise<unknown> {
    return browser.get(`${browser.baseUrl}${url}`) as Promise<unknown>;
  }

  getTitleText(id: string): Promise<string> {
    return element(by.css(id)).getText() as Promise<string>;
  }
}
