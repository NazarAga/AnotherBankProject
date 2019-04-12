let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
   
    directConnect : true,
  
   capabilities: {
    browserName: 'chrome'
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
  
},
    
    jasmineNodeOpts: {
        showColors: true, 
        defaultTimeoutInterval: 50000,    
        print: function() {}
        
}
};