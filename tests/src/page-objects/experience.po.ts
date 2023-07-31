export class ExperiencesPage {
  async navigateTo(): Promise<any> {
    return await browser.url('/experience');
  }
}
