'use strict';

/**
 * Checks if Google Tag Manager (GTM) is enabled for the current site.
 * @returns {boolean} True if GTM is enabled and the container ID is not empty, false otherwise.
 */
function isGTMEnabled() {
    var Site = require('dw/system/Site');

    var currentSite = Site.current;
    var isGtmEnabled = currentSite.getCustomPreferenceValue('gtmEnabled');
    var gtmContainerID = currentSite.getCustomPreferenceValue('gtmContainerId');

    return isGtmEnabled && !empty(gtmContainerID);
}

/**
 * Determines the page type based on the response data.
 * @param {Object} res - The response object.
 * @returns {string} The determined page type.
 */
function getPageType(res) {
    var pageTypes = require('*/cartridge/config/pageTypes');

    var result = '';
    var viewData = res.viewData;
    var action = viewData.action;
    var renderingTemplate = !empty(res.renderings) ? res.renderings[0].view : '';

    // Handle dynamic page types
    switch (action) {
        case 'Product-Show':
        case 'Product-ShowInCategory':
            result = renderingTemplate === 'error/notFound' ? 'error' : 'pdp';
            break;
        case 'Order-Confirm':
            result = renderingTemplate === '/error' ? 'error' : 'orderconfirmation';
            break;
        case 'Search-Show':
        case 'Search-ShowFolder':
            var productSearch = viewData.productSearch;

            if (productSearch && productSearch.isCategorySearch) {
                result = renderingTemplate === 'rendering/category/catLanding' ? 'clp' : 'plp';
                break;
            }

            result = productSearch && !empty(productSearch.productIds) ? 'search' : 'nosearchresult';
            break;
        default:
            // Handle static page types
            result = Object.keys(pageTypes).find((pageType) => pageTypes[pageType].includes(action)) || 'other';
    }

    return result;
}

/**
 * Retrieves GTM page data based on the page type.
 * @param {Object} pdict - The parameter dictionary containing GTM data.
 * @returns {Object} The GTM page data.
 */
function getPageData(pdict) {
    var gtmData = pdict.gtmData || {};
    var result = {};

    // Add or transform any additional data needed within the page's scope.
    switch (gtmData.pageType) {
        case 'pdp':
            if (pdict.product) {
                result.items = [pdict.product.gtmProductData];
            }
            break;
        case 'cart':
            if (pdict.gtmCartData) {
                result.items = pdict.gtmCartData.items;
            }
            break;
        case 'checkout':
        case 'orderconfirmation':
            if (pdict.order && pdict.order.gtmOrderData) {
                result.items = pdict.order.gtmOrderData.items;
                result.totals = pdict.order.gtmOrderData.totals;
            }
            break;
    }

    return result;
}

/**
 * Retrieves GTM promotion data based on the slot content.
 * @param {Object} slotcontent - The slot content object.
 * @returns {Object|undefined} The GTM promotion data or undefined if GTM is not enabled or slotcontent is empty.
 */
function getPromotionData(slotcontent) {
    if (!this.isGTMEnabled() || !slotcontent) {
        return;
    }

    var gtmPromotionData = {
        creative_slot: slotcontent.slotID,
        creative_name: slotcontent.calloutMsg ? slotcontent.calloutMsg.markup : ''
    };

    return gtmPromotionData;
}

module.exports = {
    getPageType: getPageType,
    getPageData: getPageData,
    isGTMEnabled: isGTMEnabled,
    getPromotionData: getPromotionData
};
