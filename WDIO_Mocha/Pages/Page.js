export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        return browser.url(path)
    }
}