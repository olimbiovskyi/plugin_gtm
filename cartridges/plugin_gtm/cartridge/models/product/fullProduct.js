'use strict';

var base = module.superModule;

/**
 * Extends the fullProduct function to include GTM data.
 * @param {Object} product - The product object to decorate.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 * @param {Object} options - Additional options for product decoration.
 * @returns {Object} The decorated product object.
 */
module.exports = function fullProduct(product, apiProduct, options) {
    var decorators = require('*/cartridge/models/product/decorators/index');

    base.call(this, product, apiProduct, options);
    decorators.gtm(product, apiProduct, options);

    return product;
};
