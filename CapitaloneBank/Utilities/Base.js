var Base = function(){
    this.homeUrl = 'https://www.capitalone.com/';

    this.navigateToHome=function(){
        browser.get(this.homeUrl);
    };
    
    this.careersUrl='https://www.capitalonecareers.com/';

    this.navigateToCareers=function(){
        browser.get(this.careersUrl);
    }
    this.scrollDown=function(element){
        browser.executeScript('arguments[0].scrollIntoView();',element);
    }

}
module.exports = new Base();