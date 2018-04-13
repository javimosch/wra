module.exports = function (multianalytics) {
 
  return {
    trackCallToActionButtonClick (buttonName = "try_app") {
        multianalytics.trackEvent({
        	category:"button",
        	action: 'click',
        	label:"landing",
        	value:buttonName
        });
    }
  }
}