'use strict';

/**
 * Registers a route to include Google Tag Manager (GTM) data.
 * @param {Object} route - The route object.
 */
function registerRoute(route) {
    var gtmHelpers = require('*/cartridge/scripts/helpers/gtmHelpers');

    if (!gtmHelpers.isGTMEnabled()) {
        return;
    }

    var req = route.req;

    // Skip include and ajax requests
    if (req.includeRequest || req.httpHeaders.get('x-requested-with') === 'XMLHttpRequest') {
        return;
    }

    // Add event handler for rendering out view on completion of the request chain
    route.on('route:BeforeComplete', function onRouteCompleteHandler(req, res) {
        var gtmHelpers = require('*/cartridge/scripts/helpers/gtmHelpers');
        var pageType = gtmHelpers.getPageType(res);

        res.setViewData({
            gtmData: {
                pageType: pageType
            }
        });
    });
}

/**
 * Renders the GTM data in the HTML head section.
 * @param {Object} pdict - The parameter dictionary.
 */
function htmlHead(pdict) {
    var gtmHelpers = require('*/cartridge/scripts/helpers/gtmHelpers');

    if (!gtmHelpers.isGTMEnabled()) {
        return;
    }

    var Site = require('dw/system/Site');
    var ISML = require('dw/template/ISML');
    var GlobalData = require('*/cartridge/models/gtm/globalData');

    var gtmData = pdict.gtmData || {};
    var gtmGlobalData = new GlobalData(gtmData.pageType);

    ISML.renderTemplate('common/gtmGlobalData', {
        gtmGlobalData: gtmGlobalData
    });

    ISML.renderTemplate('common/gtmHtmlHead', {
        gtmContainerID: Site.current.getCustomPreferenceValue('gtmContainerId')
    });
}

/**
 * Renders the GTM page data after the footer section.
 * @param {Object} pdict - The parameter dictionary.
 */
function afterFooter(pdict) {
    var gtmHelpers = require('*/cartridge/scripts/helpers/gtmHelpers');

    if (!gtmHelpers.isGTMEnabled()) {
        return;
    }

    var ISML = require('dw/template/ISML');

    var gtmPageData = gtmHelpers.getPageData(pdict);

    ISML.renderTemplate('common/gtmPageData', {
        gtmPageData: gtmPageData
    });
}

module.exports = {
    htmlHead: htmlHead,
    afterFooter: afterFooter,
    registerRoute: registerRoute
};
