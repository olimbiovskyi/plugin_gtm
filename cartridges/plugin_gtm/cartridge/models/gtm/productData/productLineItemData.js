'use strict';

/**
 * Constructs a ProductLineItemData instance, extracting line item-specific attributes.
 * @constructor
 * @param {dw.catalog.Product} apiProduct - The product object from the API. (Not directly used here.)
 * @param {Object} [options] - Optional parameters to initialize the ProductLineItemData instance.
 * @param {dw.order.LineItem} options.lineItem - The line item object from the API.
 */
function ProductLineItemData(apiProduct, options) {
    var params = options || {};

    if (!params.lineItem) {
        return;
    }

    this.quantity = lineItem.quantityValue;
    this.price = lineItem.adjustedPrice.divide(lineItem.quantityValue || 1).value;
    this.assignCoupons(lineItem);
}

/**
 * Assigns coupon codes from the line item's price adjustments.
 * @param {dw.order.LineItem} lineItem - The line item object from the API.
 */
ProductLineItemData.prototype.assignCoupons = function (lineItem) {
    if (!lineItem.priceAdjustments.length) {
        return;
    }

    var collections = require('*/cartridge/scripts/util/collections');

    var couponCodes = collections.reduce(
        lineItem.priceAdjustments,
        function (codes, priceAdjustment) {
            if (
                priceAdjustment.promotion &&
                priceAdjustment.couponLineItem &&
                priceAdjustment.couponLineItem.couponCode
            ) {
                codes.push(priceAdjustment.couponLineItem.couponCode);
            }
            return codes;
        },
        []
    );

    if (couponCodes.length) {
        this.coupon = couponCodes.join(';');
    }
};
