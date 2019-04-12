var Base = require('../Utilities/Base.js');
var HomePage=require('../Pages/Home.page.js');
var CareersPage=require('../Pages/Careers.page.js');
var HomePageData=require('../TestData/HomePageData.json');
require('../Utilities/CustomLocators.js');

describe('Testing Capitalone Bank page', () => {
    

   

    describe('Testing Careers & Jobs Page in footer section', () => {
        beforeAll(function(){
            Base.navigateToHome();
            browser.sleep(1000);
            HomePage.careersLink.click();
            browser.sleep(2000);
            
        });
        browser.waitForAngularEnabled(false);
        it('should check current Url', () => {
            
            expect(browser.getCurrentUrl()).toEqual('https://www.capitalonecareers.com/');
            
        });

        it('(should test entering special characters as a search keyword)', () => {
            CareersPage.jobSearchBox.sendKeys('#@%^').sendKeys(protractor.Key.ENTER);
            browser.sleep(1000);
            expect(CareersPage.resultsHeader.getText()).toContain('0 RESULTS');
            expect(CareersPage.noResultsText.getText()).toContain('Please try a different keyword');

        });

        it('should negatif test for job search location box ', () => {
            Base.navigateToCareers();
            CareersPage.locationBox.sendKeys('New York, NY').sendKeys(protractor.Key.ENTER);
            expect(CareersPage.locationError.getText()).toContain('Choose a location from the suggestions');
        });

        it('should test Radius option box by correct location',()=>{
            Base.navigateToCareers();
            CareersPage.locationBox.sendKeys('New York, NY');
            expect(CareersPage.radiusBox.isEnabled()).toBe(false);
            browser.sleep(2000);
            CareersPage.locationsBox.first().sendKeys(protractor.Key.ARROW_DOWN);
            browser.sleep(1000);
            expect(CareersPage.radiusBox.isEnabled()).toBe(true);

        })

        var jobDescription;
        it('should search some job keywords and check results', () => {
           
            Base.navigateToCareers();
            CareersPage.jobSearchBox.sendKeys('AUTOMATION').sendKeys(protractor.Key.ENTER);
            browser.sleep(1000);
            CareersPage.searchResult.click();
            browser.sleep(1000);
            CareersPage.jobDescriptionHeader.getText().then(txt=>{
                jobDescription=txt.toUpperCase();
                console.log(txt);
            })
            CareersPage.saveJobButton.click();
        });

        it('should test Saved Jobs button',()=>{
            CareersPage.savedJobButton.click();
            expect(CareersPage.savedResult.getText()).toEqual(jobDescription);
        });
   
        it('should check filter results button', () => {
            var most, total, statesArray=[];
            //Base.navigateToCareers();
            CareersPage.jobSearchBox.sendKeys('AUTOMATION').sendKeys(protractor.Key.ENTER);
            browser.sleep(1000);
            expect(CareersPage.resultsHeader.isDisplayed()).toBe(true);
            CareersPage.resultsHeader.getText().then(txt=>{
                txt.split(' ');
                total=txt[0]+txt[1]+txt[2];
            })
            CareersPage.filterRegion.click();
          
            CareersPage.statesJobCount.getText().then(txt=>{
                statesArray=txt;
            }).then(()=>{
                
                    for(var x=total;x>1;x--){
                        for(var i=0;i<statesArray.length;i++){
                            if(statesArray[i]==x){
                                console.log(i, x);
                                x=-1;
                                most=i;
                            }
                        }
                    }
                    $('#region-filter-'+most).click();
            })
            browser.sleep(1000);
            expect(CareersPage.filteredButton.getText()).toEqual('Virginia, United States');
            browser.sleep(1000);
           
        });

        it('should test Job Alerts form is Displayed', () => {
            CareersPage.jobSearchBox.sendKeys(protractor.Key.ENTER);
            browser.sleep(1000);
            expect(CareersPage.jobAlertsForm.isDisplayed()).toBe(true);
        });
         
        it('should test Job Alerts form without filling to Sign up ', () => {
            var firstColor;
            CareersPage.filterExpand.click();
            browser.sleep(1000);
            CareersPage.emailInputBox.getCssValue('border-color').then(color=>{   
               firstColor=color;
            });
            expect(CareersPage.fieldValErrors.first().isPresent()).toBe(false);
            CareersPage.signUpButton.click();
            CareersPage.emailInputBox.getCssValue('border-color').then(color=>{
               expect(firstColor).not.toEqual(color);
            });
            expect(CareersPage.fieldValErrors.first().isDisplayed()).toBe(true);
            
        });  

        it('should check for Next, Previous page pagination functionality', () => {
            Base.scrollDown(CareersPage.resultsNextPage);
            browser.sleep(1000);
            CareersPage.resultsNextPage.click();
            browser.sleep(1000);
            Base.scrollDown(CareersPage.resultsNextPage);
            expect(CareersPage.resultsPageNumber.getAttribute('value')).toEqual('2');
            CareersPage.resultsPrevPage.click();
            browser.sleep(1000);
            expect(CareersPage.resultsPageNumber.getAttribute('value')).toEqual('1');
        });


    });

    });