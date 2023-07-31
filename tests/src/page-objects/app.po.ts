export class AppPage {
  async navigateTo() {
    return await browser.url('');
  }

  async getTitleText(): Promise<string> {
    const elementRef = await browser.findElement('css', 'bl-root .content span')
    const element = await $(elementRef)
    return element.getText();
  }
}
