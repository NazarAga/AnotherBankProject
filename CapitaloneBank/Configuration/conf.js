let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');
var jasmineReporters = require('jasmine-reporters');     
var HTMLReport = require('protractor-html-reporter-2');

exports.config = {
   
  seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect : true,
  
   capabilities: {
    // browserName: 'chrome'
    browserName: 'internet explorer'
  },

  
  
 specs: ['../Tests/CapitalOne.spec.js'], 
//  suites:{
//     smoke:['../Tests/CapitalOne.spec.js'],
//     regression:['../Tests/*.spec.js']
// },


onPrepare: function () {
    browser.driver.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000);
    jasmine.getEnv().addReporter(new SpecReporter({
        displayFailuresSummary: true,
        displayFailuredSpec: true,
        displaySuiteNumber: true,
        displaySpecDuration: true,
        showstack: false
      }));
      // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
      jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: '../Report/screenshots',
        preserveDirectory: false,
        screenshotsSubfolder: 'images',
         jsonsSubfolder: 'jsons',
         docName: 'CapitalOneBank-Report.html'
     }).getJasmine2Reporter());
     jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './',
      filePrefix: 'xmlresults'
  }));
  
},
onComplete: function() {
  var browserName, browserVersion;
  var capsPromise = browser.getCapabilities();

  capsPromise.then(function (caps) {
     browserName = caps.get('browserName');
     browserVersion = caps.get('version');
     platform = caps.get('platform');

     testConfig = {
         reportTitle: 'Protractor Test Execution Report',
         outputPath: './',
         outputFilename: 'ProtractorTestReport',
         screenshotPath: './screenshots',
         testBrowser: browserName,
         browserVersion: browserVersion,
         modifiedSuiteName: false,
         screenshotsOnlyOnFailure: true,
         testPlatform: platform
     };
     new HTMLReport().from('xmlresults.xml', testConfig);
 });
},
plugins: [{
  package: 'jasmine2-protractor-utils',
  disableHTMLReport: true,
  disableScreenshot: false,
  screenshotPath:'./screenshots',
  screenshotOnExpectFailure:false,
  screenshotOnSpecFailure:true,
  clearFoldersBeforeTest: true
}],
    
    jasmineNodeOpts: {
        showColors: true, 
        defaultTimeoutInterval: 50000,    
        print: function() {}
        
}
};