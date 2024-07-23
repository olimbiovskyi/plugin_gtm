'use strict';

var base = module.superModule;

/**
 * Extends the productTile function to include GTM data.
 * @param {Object} product - The product object to decorate.
 * @param {Object} apiProduct - The product object from the API.
 * @param {string} productType - The product type information.
 * @returns {Object} The decorated product object.
 */
module.exports = function productTile(product, apiProduct, productType) {
    var decorators = require('*/cartridge/models/product/decorators/index');

    base.call(this, product, apiProduct, productType);
    decorators.gtm(product, apiProduct);

    return product;
};
