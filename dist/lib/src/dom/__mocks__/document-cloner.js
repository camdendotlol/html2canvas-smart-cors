export class DocumentCloner {
    clonedReferenceElement;
    constructor() {
        this.clonedReferenceElement = {
            ownerDocument: {
                defaultView: {
                    pageXOffset: 12,
                    pageYOffset: 34
                }
            }
        };
    }
    toIFrame() {
        return Promise.resolve({});
    }
    static destroy() {
        return true;
    }
}
//# sourceMappingURL=document-cloner.js.map