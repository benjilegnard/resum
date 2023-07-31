export class SkillsPage {
  async navigateTo(): Promise<any> {
    return await browser.url('/skills');
  }
}
