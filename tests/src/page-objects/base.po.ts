export default class Page {
    constructor() {
    }

    async open (path: string) {
        await browser.url(path)
    }
}