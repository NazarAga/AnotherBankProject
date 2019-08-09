var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should test footer logo and social media icons are displayed|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00fe00a2-0076-00ab-00a8-0081007500e5.png",
        "timestamp": 1565325864625,
        "duration": 6589
    },
    {
        "description": "should check footer section product names|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ee0053-00ec-002a-00f1-000b00a80097.png",
        "timestamp": 1565325872982,
        "duration": 2109
    },
    {
        "description": "should chek instagram icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00990047-0088-0034-00eb-007200ed00bd.png",
        "timestamp": 1565325876503,
        "duration": 10960
    },
    {
        "description": "should chek twitter icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005a0003-0091-0046-0094-00fc00300028.png",
        "timestamp": 1565325889352,
        "duration": 13696
    },
    {
        "description": "should chek facebook icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00bb00ab-0022-0000-0011-007600070090.png",
        "timestamp": 1565325904774,
        "duration": 15969
    },
    {
        "description": "should chek linkedIn icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003a0017-0048-0020-0031-001700990025.png",
        "timestamp": 1565325922404,
        "duration": 8315
    },
    {
        "description": "should chek youTube icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d20082-008f-0030-006c-000d00ff00a7.png",
        "timestamp": 1565325932310,
        "duration": 9630
    },
    {
        "description": "should check Feedback icon is works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": false,
        "pending": true,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\004f00c7-000f-00fd-0059-009c00b6002f.png",
        "timestamp": 1565325943469,
        "duration": 0
    },
    {
        "description": "should test the Privacy Policy,Security and Terms&Conditions are available for users|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00b500b5-00b9-0099-008a-00100024003e.png",
        "timestamp": 1565325943487,
        "duration": 1876
    },
    {
        "description": "should test Call Us and gets phone number|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": false,
        "pending": false,
        "os": "WINDOWS",
        "sessionId": "c803c1b0-0715-4cf9-9663-9c80b2d2b9a9",
        "instanceId": 6512,
        "browser": {
            "name": "internet explorer",
            "version": "11"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //*[@class='component'][2]/ul[6])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //*[@class='component'][2]/ul[6])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.it (C:\\Users\\Nazar\\Desktop\\protractorProjects\\BugChasersProject\\CapitaloneBank\\Tests\\CapitalOne.spec.js:83:36)\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should test Call Us and gets phone number\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\Nazar\\Desktop\\protractorProjects\\BugChasersProject\\CapitaloneBank\\Tests\\CapitalOne.spec.js:81:9)\n    at addSpecsToSuite (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\Nazar\\Desktop\\protractorProjects\\BugChasersProject\\CapitaloneBank\\Tests\\CapitalOne.spec.js:10:5)\n    at addSpecsToSuite (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\Nazar\\Desktop\\protractorProjects\\BugChasersProject\\CapitaloneBank\\Tests\\CapitalOne.spec.js:7:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00d600dd-0037-0005-005e-004a000700d5.png",
        "timestamp": 1565325946788,
        "duration": 13949
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
