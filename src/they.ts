export function they<T extends any[] | any>(description: string, testCases: T[], assertion: (args: T, done?: DoneFn) => void): void {
    return _they(it)(description, testCases, assertion);
}

export function xthey<T extends any[] | any>(description: string, testCases: T[], assertion: (args: T, done?: DoneFn) => void): void {
    return _they(xit)(description, testCases, assertion);
}

export function fthey<T extends any[] | any>(description: string, testCases: T[], assertion: (args: T, done?: DoneFn) => void): void {
    return _they(fit)(description, testCases, assertion);
}

function _they(test: Function): <T extends any[] | any>(description: string, testCases: T[], assertion: (args: T, done?: DoneFn) => void) => void {
    return <T extends any[] | any>(description: string, testCases: T[], assertion: (args: T, done?: DoneFn) => void) => {
        if (!testCases.length) {
            return;
        }

        return describe(`${description} (${testCases.length} ${testCases.length > 1 ? "cases" : "case"})`, () => {
            testCases.forEach(testCase => {
                const assertionWrapper = assertion.length > 1
                    ? (done: DoneFn) => assertion(testCase, done)
                    : () => assertion(testCase);
                test(`${description} (${JSON.stringify(testCase)})`, assertionWrapper);
            });
        });
    };
}
