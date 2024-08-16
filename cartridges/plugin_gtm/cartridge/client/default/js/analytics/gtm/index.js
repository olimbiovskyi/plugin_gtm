'use strict';

const utils = require('./util');
const eventsConfig = require('./eventsConfig');
const pageViewHandlers = require('./pageViewHandlers');
const interactionHandlers = require('./interactionHandlers');

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

        // Retrieve global events
        const globalPageViewEvents = eventsConfig.global?.events?.pageViewEvents || [];
        const globalInteractionEvents = eventsConfig.global?.events?.interactionEvents || [];

        // Retrieve page-specific events
        const pageSpecificPageViewEvents = eventsConfig.pages?.[pageType]?.pageViewEvents || [];
        const pageSpecificInteractionEvents = eventsConfig.pages?.[pageType]?.interactionEvents || [];

        // Combine global and page-specific events
        const pageViewEventsToInit = [...globalPageViewEvents, ...pageSpecificPageViewEvents];
        const interactionEventsToInit = [...globalInteractionEvents, ...pageSpecificInteractionEvents];

        // Execute the events
        utils.executeFunctions(pageViewEventsToInit, pageViewHandlers, [gtmData]);
        utils.executeFunctions(interactionEventsToInit, interactionHandlers, [gtmData]);
    }
};
