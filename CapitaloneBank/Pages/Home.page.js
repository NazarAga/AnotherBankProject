
var HomePage=function(){

    this.logo=$('a[aria-label="Capital One"]');
    this.footerMainProducts=$$('.site-footer__row-products button');
    this.careersLink=element(by.linkText('Careers & Jobs'));
    this.feedbackButton=by.xpath("//iframe[@title='Usabilla Feedback Button']");
    this.feedbackForm=by.xpath("//iframe[@title='Usabilla Feedback Form Frame']");
    this.feedbackStar5=element(by.xpath("//label[@for='star5']"));
    this.feedbackType=element(by.name('feedback_type'));
    this.feedbackCompliment=element(by.xpath('//*[@value="compliment"]'));
    this.feedbackText=element.all(by.xpath('//textarea[@name="feedback"]')).last();
    this.feedbackCustomerNo=element.all(by.xpath('//*[@value="No"]')).last();
    this.feedbackFormClose=$('a.close');
    this.linkPrivacy=$$('.site-footer__center-content>a').get(0);
    this.linkSecurity=$$('.site-footer__center-content>a').get(1);
    this.linkTerms=$$('.site-footer__center-content>a').get(2);
    this.callUsLink=element(by.linkText('Call Us'));
    this.contactNumber=element(by.xpath("//*[@class='component'][2]/ul[6]"));1

}
module.exports=new HomePage();