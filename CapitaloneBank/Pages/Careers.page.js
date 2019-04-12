
var CareersPage=function(){

    this.jobSearchBox=$('.keyword-wrapper input');
    this.locationBox=$('.search-location');
    this.locationsBox=$$('.search-location');
    this.locationError=$('.search-location-error');
    this.radiusBox=$('.search-radius');
    this.searchResult=$('.results-list li:nth-of-type(2)>a');
    this.jobDescriptionHeader=$('.job-description>h1');
    this.saveJobButton= $('#save-job');
    this.savedJobButton=$$('.button').first();
    this.savedResult=$('.results-list h2');
    this.resultsHeader=$('.page-header');
    this.filterRegion=$('#region-toggle');
    this.stateName22=$('#region-filter-22');
    this.statesJobCount= element.all(by.xpath("//*[@data-filter-id='3']//b[2]"));
    this.filteredButton=$('a.filter-button');
    this.jobAlertsForm=$('form.data-form  ');
    this.filterExpand=$('.filter-expand');
    this.emailInputBox=$('p.form-field.required input');
    this.fieldValErrors=$$('.field-validation-error>span');
    this.signUpButton=element(by.xpath('//input[@value="Sign up"]'));
    this.resultsNextPage=$('.next');
    this.resultsPrevPage=$('.prev');
    this.resultsPageNumber=$('#pagination-current-bottom');
    this.noResultsText=$('#no-results');

}
module.exports=new CareersPage();