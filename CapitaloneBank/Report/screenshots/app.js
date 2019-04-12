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
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00070075-0072-003d-00af-0071009100ef.png",
        "timestamp": 1552598286462,
        "duration": 231
    },
    {
        "description": "should check footer section product names|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00760018-0099-00f9-0064-00fd00a5008e.png",
        "timestamp": 1552598287111,
        "duration": 100
    },
    {
        "description": "should chek instagram icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00790041-00a0-0071-00f9-006000aa0070.png",
        "timestamp": 1552598287582,
        "duration": 3208
    },
    {
        "description": "should chek twitter icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://abs.twimg.com/k/en/init.en.e0a0f536f3a90c290804.js 13 Refused to load the script 'https://cm.g.doubleclick.net/pixel?google_nid=twitter_dbm&google_cm&tpm_cb=partnerIdSyncComplete&_=1552598292080' because it violates the following Content Security Policy directive: \"script-src 'nonce-HLXkKDWCc55yPzQz6Y/1kw==' https://ssl.google-analytics.com https://twitter.com 'unsafe-eval' https://*.twimg.com https://api.twitter.com https://analytics.twitter.com https://publish.twitter.com https://ton.twitter.com https://syndication.twitter.com https://www.google.com https://platform.twitter.com https://www.google-analytics.com blob: 'self'\". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.\n",
                "timestamp": 1552598294322,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00c800e0-005f-006a-0091-00bb00a700e4.png",
        "timestamp": 1552598291130,
        "duration": 3303
    },
    {
        "description": "should chek facebook icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://www.facebook.com/capitalone/ - [DOM] Found 2 elements with non-unique id #email: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1552598297984,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.facebook.com/capitalone/ - [DOM] Found 2 elements with non-unique id #lgnjs: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1552598297984,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.facebook.com/capitalone/ - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1552598297984,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.facebook.com/capitalone/ - [DOM] Found 2 elements with non-unique id #login_form: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1552598297984,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.facebook.com/capitalone/ - [DOM] Found 2 elements with non-unique id #pass: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1552598297984,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.facebook.com/capitalone/ - [DOM] Found 2 elements with non-unique id #prefill_contact_point: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1552598297984,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.facebook.com/capitalone/ - [DOM] Found 2 elements with non-unique id #prefill_source: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1552598297985,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.facebook.com/capitalone/ - [DOM] Found 2 elements with non-unique id #prefill_type: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1552598297985,
                "type": ""
            }
        ],
        "screenShotFile": "images\\009400fb-0066-0083-0003-005f004b00c5.png",
        "timestamp": 1552598294799,
        "duration": 4180
    },
    {
        "description": "should chek linkedIn icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e2007e-008b-0071-0023-0023008f0022.png",
        "timestamp": 1552598299409,
        "duration": 3278
    },
    {
        "description": "should chek youTube icon works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "deprecation - HTML Imports is deprecated and will be removed in M73, around March 2019. Please use ES modules instead. See https://www.chromestatus.com/features/5144752345317376 for more details.",
                "timestamp": 1552598306255,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.youtube.com/user/capitalone/ - Refused to display 'https://accounts.google.com/ServiceLogin?passive=true&uilel=3&hl=en&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Fnext%3D%252Fsignin_passive%26action_handle_signin%3Dtrue%26hl%3Den%26app%3Ddesktop%26feature%3Dpassive&service=youtube' in a frame because it set 'X-Frame-Options' to 'deny'.",
                "timestamp": 1552598306256,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.youtube.com/yts/jsbin/desktop_polymer-vflyB3s0k/desktop_polymer.js 22 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1552598306256,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "chrome-extension://invalid/ - Failed to load resource: net::ERR_FAILED",
                "timestamp": 1552598306256,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "chrome-extension://invalid/ - Failed to load resource: net::ERR_FAILED",
                "timestamp": 1552598306256,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.youtube.com/yts/jsbin/network-vfl3EpVxj/network.js 14 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1552598306256,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00f30005-005e-00bc-00e3-00a800360099.png",
        "timestamp": 1552598303082,
        "duration": 3482
    },
    {
        "description": "should check Feedback icon is works properly|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\001c004b-00e0-001c-0081-0054005a0064.png",
        "timestamp": 1552598306970,
        "duration": 0
    },
    {
        "description": "should test the Privacy Policy,Security and Terms&Conditions are available for users|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c700d2-002d-0089-000a-0006005300f1.png",
        "timestamp": 1552598306986,
        "duration": 86
    },
    {
        "description": "should test Call Us and gets phone number|Testing CapitalOne.com main page footer functionalities|Testing Capitalone Bank page",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17040,
        "browser": {
            "name": "chrome",
            "version": "72.0.3626.121"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //*[@class='component'][2]/ul[6])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //*[@class='component'][2]/ul[6])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.it (C:\\Users\\Nazar\\Desktop\\BugChasersProject\\CapitaloneBank\\Tests\\CapitalOne.spec.js:83:36)\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should test Call Us and gets phone number\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\Nazar\\Desktop\\BugChasersProject\\CapitaloneBank\\Tests\\CapitalOne.spec.js:81:9)\n    at addSpecsToSuite (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\Nazar\\Desktop\\BugChasersProject\\CapitaloneBank\\Tests\\CapitalOne.spec.js:10:5)\n    at addSpecsToSuite (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\Nazar\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\Nazar\\Desktop\\BugChasersProject\\CapitaloneBank\\Tests\\CapitalOne.spec.js:7:1)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.capitalone.com/assets/ng4fk/main.85ac0b6241977dd1c0a7.bundle.js 0:645637 \"Error tracking page view: \" TypeError: Cannot read property 'fields' of undefined\n    at PageChangeService.onPageMeta (https://www.capitalone.com/assets/ng4fk/main.85ac0b6241977dd1c0a7.bundle.js:1:645613)\n    at RouteWrapperComponent.loadPageComponent (https://www.capitalone.com/assets/ng4fk/main.85ac0b6241977dd1c0a7.bundle.js:1:72742)\n    at SafeSubscriber._next (https://www.capitalone.com/assets/ng4fk/main.85ac0b6241977dd1c0a7.bundle.js:1:71373)\n    at SafeSubscriber.__tryOrSetError (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:182190)\n    at SafeSubscriber.next (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:181317)\n    at Subscriber._next (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:180627)\n    at Subscriber.next (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:180262)\n    at ScalarObservable._subscribe (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:2756)\n    at ScalarObservable.Observable.subscribe (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:388)\n    at RouteWrapperComponent.ngOnInit (https://www.capitalone.com/assets/ng4fk/main.85ac0b6241977dd1c0a7.bundle.js:1:71301)\n    at checkAndUpdateDirectiveInline (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:59578)\n    at checkAndUpdateNodeInline (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:77212)\n    at checkAndUpdateNode (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:76561)\n    at prodCheckAndUpdateNode (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:85269)\n    at Object.eval [as updateDirectives] (ng:///SharedModule/RouteWrapperComponent_Host.ngfactory.js:9:5)\n    at Object.updateDirectives (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:82139)\n    at checkAndUpdateView (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:76100)\n    at callViewAction (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:80177)\n    at execEmbeddedViewsAction (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:79740)\n    at checkAndUpdateView (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:76122)\n    at callViewAction (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:80177)\n    at execComponentViewsAction (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:79420)\n    at Object.checkAndUpdateView (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:76297)\n    at ViewRef_.detectChanges (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:165934)\n    at https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:131169\n    at Array.forEach (<anonymous>)\n    at ApplicationRef_.tick (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:131140)\n    at https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:128907\n    at ZoneDelegate.invoke (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:64512)\n    at Object.onInvoke (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:37162)\n    at ZoneDelegate.invoke (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:64452)\n    at Zone.run (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:59602)\n    at NgZone.run (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:122411)\n    at Object.next (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:128890)\n    at SafeSubscriber.t.object.o [as _next] (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:120840)\n    at SafeSubscriber.__tryOrUnsub (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:182067)\n    at SafeSubscriber.next (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:181374)\n    at Subscriber._next (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:180627)\n    at Subscriber.next (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:180262)\n    at EventEmitter.Subject.next (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:6813)\n    at EventEmitter.emit (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:120603)\n    at checkStable (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:36742)\n    at Object.onHasTask (https://www.capitalone.com/assets/ng4fk/vendor.3ccd79d5893be951d03d.bundle.js:1:37310)\n    at ZoneDelegate.hasTask (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:65591)\n    at ZoneDelegate._updateTaskCount (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:65950)\n    at Zone._updateTaskCount (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:61895)\n    at Zone.runTask (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:60497)\n    at drainMicroTaskQueue (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:57306)\n    at a (https://www.capitalone.com/assets/universal-nav/js/universal-nav.8b9a4ee183a1b3f770fc.js:20:54063)\n    at https://www.capitalone.com/assets/universal-nav/js/universal-nav.8b9a4ee183a1b3f770fc.js:20:54208\n    at MutationObserver.l (https://www.capitalone.com/assets/universal-nav/js/universal-nav.8b9a4ee183a1b3f770fc.js:20:51227)\n    at ZoneDelegate.invoke (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:64512)\n    at Zone.runGuarded (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:59808)\n    at MutationObserver.<anonymous> (https://www.capitalone.com/assets/ng4fk/polyfills.a38bf167cef8d30845a1.bundle.js:1:59414)\n    at MutationObserver.nrWrapper (https://www.capitalone.com/assets/ng4fk/nr-prod.js:1:16980)",
                "timestamp": 1552598309788,
                "type": ""
            }
        ],
        "screenShotFile": "images\\006600f9-00bc-009c-0015-00870027009b.png",
        "timestamp": 1552598307453,
        "duration": 7475
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
