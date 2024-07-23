'use strict';

var base = module.superModule;

/**
 * Extends the bonusProduct function to include GTM data.
 * @param {Object} product - The product object to decorate.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 * @param {Object} options - Options passed in from the factory.
 * @param {string} duuid - The UUID of the discount line item.
 * @returns {Object} The decorated product object.
 */
module.exports = function bonusProduct(product, apiProduct, options, duuid) {
    var decorators = require('*/cartridge/models/product/decorators/index');

    base.call(this, product, apiProduct, options, duuid);
    decorators.gtm(product, apiProduct, options);

    return product;
};
