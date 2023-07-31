import { When } from "@cucumber/cucumber";

When("and i take a screenshot", async function takeScreenshot() {
     
  const buffer: string = await browser.takeScreenshot();
  this.attach(buffer, 'image/png');
 
});