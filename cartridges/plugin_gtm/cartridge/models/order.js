'use strict';

var base = module.superModule;

/**
 * OrderModel class for managing order data specific to GTM.
 * @constructor
 * @param {dw.order.LineItemCtnr} lineItemContainer - Current users's basket/order.
 * @param {Object} [options] - Additional options for the model.
 */
function OrderModel(lineItemContainer, options) {
    base.call(this, lineItemContainer, options);

    var gtmHelpers = require('*/cartridge/scripts/helpers/gtmHelpers');

    if (lineItemContainer && gtmHelpers.isGTMEnabled()) {
        var items = this.items.items.map(function (item) {
            return item.gtmProductData;
        });

        this.gtmOrderData = {
            items: items,
            totals: {
                transaction_id: this.orderNumber,
                tax: lineItemContainer.totalTax.valueOrNull || 0,
                value: lineItemContainer.totalGrossPrice.valueOrNull || 0,
                shipping: lineItemContainer.shippingTotalPrice.valueOrNull || 0
            }
        };

        if (lineItemContainer.couponLineItems.length > 0) {
            var collections = require('*/cartridge/scripts/util/collections');

            var coupons = collections
                .map(lineItemContainer.couponLineItems, function (couponLineItem) {
                    return couponLineItem.couponCode;
                })
                .filter(Boolean);

            if (coupons.length) {
                this.gtmOrderData.totals.coupon = coupons.join(';');
            }
        }
    }
}

module.exports = OrderModel;
