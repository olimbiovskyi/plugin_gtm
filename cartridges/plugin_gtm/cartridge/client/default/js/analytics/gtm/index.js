'use strict';

const utils = require('./util');
const dynamicEvents = require('./dynamicEvents');
const pageLoadEvents = require('./pageLoadEvents');
const dynamicEventsConfig = require('./dynamicEventsConfig.json');
const pageLoadEventsConfig = require('./pageLoadEventsConfig.json');

/**
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

// Global variable used by GTM
window.dataLayer = window.dataLayer || [];

module.exports = {
    /**
     * Init Google Tag Manager
     */
    init() {
        const globalData = utils.getData('global');

        if (!globalData) {
            return;
        }

        const { page_type: pageType } = globalData;
        const gtmData = {
            globalData,
            pageData: utils.getData('page'),
            customerData: utils.getData('customer')
        };

        const dynamicEventsToInit = [...(dynamicEventsConfig.global || []), ...(dynamicEventsConfig[pageType] || [])];

        utils.executeFunctions(dynamicEventsToInit, dynamicEvents, [gtmData]);

        const pageLoadEventsToInit = [
            ...(pageLoadEventsConfig.global || []),
            ...(pageLoadEventsConfig[pageType] || [])
        ];

        utils.executeFunctions(pageLoadEventsToInit, pageLoadEvents, [gtmData]);
    }
};
