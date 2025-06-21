// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { testList, ignoredTests } from '../build/reftests';
import { default as platform } from 'platform';
const uploadResults = (canvas, url) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const xhr = 'withCredentials' in new XMLHttpRequest() ? new XMLHttpRequest() : new XDomainRequest();
        xhr.onload = () => {
            if (typeof xhr.status !== 'number' || xhr.status === 200) {
                resolve();
            }
            else {
                reject(`Failed to send screenshot with status ${xhr.status}`);
            }
        };
        xhr.onerror = reject;
        const request = {
            screenshot: canvas.toDataURL(),
            test: url,
            platform: {
                name: platform.name || '',
                version: platform.version || ''
            },
            devicePixelRatio: window.devicePixelRatio || 1,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
        xhr.open('POST', 'http://localhost:8000/screenshot', true);
        xhr.send(JSON.stringify(request));
    });
};
describe('Rendering Tests', () => {
    let testContainer;
    beforeEach(() => {
        testContainer = document.createElement('iframe');
        const windowWidth = 800;
        const windowHeight = 600;
        testContainer.width = windowWidth.toString();
        testContainer.height = windowHeight.toString();
        testContainer.style.visibility = 'hidden';
        testContainer.style.position = 'fixed';
        testContainer.style.left = '10000px';
        document.body.appendChild(testContainer);
    });
    afterEach(() => {
        document.body.removeChild(testContainer);
    });
    testList
        .filter((test) => {
        return !Array.isArray(ignoredTests[test]) || ignoredTests[test].indexOf(platform.name || '') === -1;
    })
        .forEach((url) => {
        it(`Should render untainted canvas for ${url}`, (done) => {
            const hasHistoryApi = typeof window.history !== 'undefined' && typeof window.history.replaceState !== 'undefined';
            testContainer.onload = async () => {
                const contentWindow = testContainer.contentWindow;
                if (!contentWindow) {
                    throw new Error('Window not found for iframe');
                }
                contentWindow.addEventListener('unhandledrejection', (event) => {
                    console.error(event.reason);
                    throw new Error(`unhandledrejection: ${JSON.stringify(event.reason)}`);
                });
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const canvas = await contentWindow.html2canvas(contentWindow.forceElement ||
                    contentWindow.document.documentElement, {
                    removeContainer: true,
                    backgroundColor: '#ffffff',
                    proxy: 'http://localhost:8081/proxy',
                    ...(contentWindow.h2cOptions || {})
                });
                try {
                    canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
                }
                catch (e) {
                    throw new Error('Canvas is tainted');
                }
                await uploadResults(canvas, url);
                done();
            };
            testContainer.src = url + '?selenium&run=false&reftest&' + Math.random();
            if (hasHistoryApi) {
                try {
                    history.replaceState(null, '', url);
                }
                catch (e) { }
            }
        });
    });
});
//# sourceMappingURL=testrunner.js.map