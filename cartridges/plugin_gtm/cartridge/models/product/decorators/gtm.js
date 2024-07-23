'use strict';

/**
 * Adds GTM product data to the product object if GTM is enabled.
 * @param {Object} product - The product object to which GTM data will be added.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 */
module.exports = function (product, apiProduct, options) {
    var gtmHelpers = require('*/cartridge/scripts/helpers/gtmHelpers');

    if (!gtmHelpers.isGTMEnabled()) {
        return;
    }

    var ProductData = require('*/cartridge/models/gtm/productData');
    var gtmProductData = new ProductData(apiProduct, options);

    Object.defineProperty(product, 'gtmProductData', {
        enumerable: true,
        value: gtmProductData
    });

    Object.defineProperty(product, 'gtmProductDataString', {
        enumerable: true,
        value: JSON.stringify(gtmProductData)
    });
};
