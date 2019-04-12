var Base = require('../Utilities/Base.js');
var HomePage=require('../Pages/Home.page.js');
var CareersPage=require('../Pages/Careers.page.js');
var HomePageData=require('../TestData/HomePageData.json');
require('../Utilities/CustomLocators.js');

describe('Testing Capitalone Bank page', () => {
    

    describe('Testing CapitalOne.com main page footer functionalities', () => {
    beforeAll(() => {
        Base.navigateToHome();
        browser.sleep(1000);   
        Base.scrollDown(HomePage.logo);
    });
    
    it('should test footer logo and social media icons are displayed', () => {
     expect(HomePage.logo.isDisplayed()).toBe(true);
     for(i=0;i<HomePageData.iconLocatKey.length;i++){
        expect($$('.site-footer__'+HomePageData.iconLocatKey[i]).first().isDisplayed()).toBe(true);
     }   
    });

    it('should check footer section product names', () => {

        HomePage.footerMainProducts.getText().then((txt)=>{
            for(i=0;i<HomePageData.footerExpecPro.length;i++){
                expect(txt[i]).toEqual(HomePageData.footerExpecPro[i]);
            }
        });
    });
    
     function iconFunctionality(a,b){
        it('should chek '+a+' icon works properly',()=>{
            browser.waitForAngularEnabled(false);
        $$('.site-footer__'+a).first().click(); 
        browser.getAllWindowHandles().then(function(handles){
            browserHandles=handles;
            browser.switchTo().window(browserHandles[1]).then(function(){
                browser.sleep(2000);
                expect(browser.getTitle()).toContain(b);
            }).then(function(){
                browser.close();
            }).then(function(){
                browser.switchTo().window(browserHandles[0]);
            })  
        })
    })
    }
         for(let x=0;x<HomePageData.iconLocatKey.length;x++){
        iconFunctionality(HomePageData.iconLocatKey[x],HomePageData.iconTitleKey[x]);
      } 

      xit('should check Feedback icon is works properly', () => {
          browser.waitForAngularEnabled(false);
          browser.switchTo()
          .frame(browser.driver.findElement(HomePage.feedbackButton).click());
         browser.sleep(1000);
          browser.switchTo()
          .frame(browser.driver.findElement(HomePage.feedbackForm));
          browser.actions().mouseMove(HomePage.feedbackStar5).perform();
          HomePage.feedbackStar5.click();
          HomePage.feedbackType .click();
          browser.sleep(1000);
          HomePage.feedbackCompliment.click();

          HomePage.feedbackText.click().sendKeys('Great Website!');
          HomePage.feedbackCustomerNo.click();
          browser.sleep(3000);
          //$('.submit').click();
          HomePage.feedbackFormClose.click();
           
      });

        it('should test the Privacy Policy,Security and Terms&Conditions are available for users', () => {
            expect(HomePage.linkPrivacy.getText()).toEqual('Privacy');
            expect(HomePage.linkSecurity.getText()).toEqual('Security');
            expect(HomePage.linkTerms.getText()).toEqual('Terms & Conditions');
        });

        it('should test Call Us and gets phone number',()=>{
            HomePage.callUsLink.click();
            HomePage.contactNumber.getText().then(txt=>{ 
                var str=txt.split('For');
              console.log(str[0]);
                
            })
        })  
    });


    });