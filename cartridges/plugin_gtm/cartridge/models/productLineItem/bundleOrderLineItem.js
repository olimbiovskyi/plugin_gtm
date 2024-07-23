'use strict';

var base = module.superModule;

/**
 * Extends the bundleOrderLineItem function to include GTM data.
 * @param {Object} product - The product object to decorate.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 * @param {Object} options - Options passed in from the factory.
 * @param {Object} factory - Reference to product factory.
 * @returns {Object} The decorated product object.
 */
module.exports = function bundleOrderLineItem(product, apiProduct, options, factory) {
    var productDecorators = require('*/cartridge/models/product/decorators/index');

    base.call(this, product, apiProduct, options, factory);
    productDecorators.gtm(product, apiProduct, options);

    return product;
};
