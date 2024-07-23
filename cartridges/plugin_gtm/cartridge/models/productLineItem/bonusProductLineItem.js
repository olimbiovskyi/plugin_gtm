'use strict';

var base = module.superModule;

/**
 * Extends the bonusProductLineItem function to include GTM data.
 * @param {Object} product - The product object to decorate.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 * @param {Object} options - Options passed in from the factory.
 * @returns {Object} The decorated product object.
 */
module.exports = function bonusProductLineItem(product, apiProduct, options) {
    var productDecorators = require('*/cartridge/models/product/decorators/index');

    base.call(this, product, apiProduct, options);
    productDecorators.gtm(product, apiProduct, options);

    return product;
};
