type TheyFunction = <T extends any[]>(description: string, testCases: T[], callback: (args: T) => void) => void;

export function they(): TheyFunction {
    return _they(it);
}

export function xthey(): TheyFunction {
    return _they(it);
}

export function fthey(): TheyFunction {
    return _they(it);
}

function _they(test: Function): TheyFunction {
    return <T extends any[]>(description: string, testCases: T[], callback: (args: T) => void) => {
        if (!testCases.length) {
            return;
        }

        return describe(`${description} (${testCases.length} ${testCases.length > 1 ? "cases" : "case"})`, () => {
            testCases.forEach(testCase => {
                test(`${description} (${JSON.stringify(testCase)})`, () => {
                    callback(testCase);
                });
            });
        });
    };
}
