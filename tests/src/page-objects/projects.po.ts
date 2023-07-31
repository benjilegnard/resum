export class ArticlesPage {
  async navigateTo(): Promise<any> {
    return await browser.url('/projects');
  }
}