'use strict';

var base = module.superModule;

/**
 * CartModel class for managing cart data specific to GTM.
 * @constructor
 * @param {dw.order.Basket} basket - Current users's basket.
 */
function CartModel(basket) {
    base.call(this, basket);

    var gtmHelpers = require('*/cartridge/scripts/helpers/gtmHelpers');

    if (basket && gtmHelpers.isGTMEnabled()) {
        var items = this.items.map(function (item) {
            return item.gtmProductData;
        });

        this.gtmCartData = {
            items: items
        };
    }
}

module.exports = CartModel;
