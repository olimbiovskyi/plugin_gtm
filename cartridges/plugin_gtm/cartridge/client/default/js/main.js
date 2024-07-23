'use strict';

var processInclude = require('base/util');

window.jQuery = window.$ = require('jquery');

$(function () {
    processInclude(require('base/components/menu'));
    processInclude(require('base/components/cookie'));
    processInclude(require('base/components/consentTracking'));
    processInclude(require('base/components/footer'));
    processInclude(require('./components/miniCart'));
    processInclude(require('base/components/collapsibleItem'));
    processInclude(require('base/components/search'));
    processInclude(require('base/components/clientSideValidation'));
    processInclude(require('base/components/countrySelector'));
    processInclude(require('base/components/toolTip'));
    processInclude(require('./analytics/gtm'));
});

require('base/thirdParty/bootstrap');
require('base/components/spinner');
