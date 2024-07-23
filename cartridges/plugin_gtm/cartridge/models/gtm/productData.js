'use strict';

/**
 * Constructs a ProductData instance with attributes from the given API product and options.
 * @constructor
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 * @param {Object} [options] - Optional parameters to initialize the ProductData instance.
 */
function ProductData(apiProduct, options) {
    var params = options || {};

    this.item_name = apiProduct.name;
    this.item_id = this.getID(apiProduct);

    if (!apiProduct.productSet) {
        this.price = this.getPrice(apiProduct);
        this.item_brand = apiProduct.brand || '';
    }

    this.assignVariant(apiProduct);
    this.assignCategories(apiProduct);
    this.assignProductLineItemAttributes(params.lineItem);
}

/**
 * Gets the ID of the product.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 * @returns {string} The ID of the product.
 */
ProductData.prototype.getID = function (apiProduct) {
    var masterProduct = apiProduct.variant ? apiProduct.variationModel.master : apiProduct;

    return masterProduct.ID;
};

/**
 * Gets the price of the product.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 * @returns {number} The sales price of the product.
 */
ProductData.prototype.getPrice = function (apiProduct) {
    var PromotionMgr = require('dw/campaign/PromotionMgr');
    var priceFactory = require('*/cartridge/scripts/factories/price');
    var promotions = PromotionMgr.activeCustomerPromotions.getProductPromotions(apiProduct);
    var price = priceFactory.getPrice(apiProduct, null, true, promotions, apiProduct.optionModel);

    return price && price.sales && price.sales.value;
};

/**
 * Assigns variant information to the product.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 */
ProductData.prototype.assignVariant = function (apiProduct) {
    var variationAttributes =
        apiProduct.master || apiProduct.variant ? apiProduct.variationModel.productVariationAttributes : null;

    if (!variationAttributes) {
        return;
    }

    var collections = require('*/cartridge/scripts/util/collections');
    var pvm = apiProduct.variationModel;

    var selectedVariationValues = collections
        .map(pvm.productVariationAttributes, function (attribute) {
            var selectedValue = pvm.getSelectedValue(attribute);
            return selectedValue ? selectedValue.displayValue : null;
        })
        .filter(Boolean);

    if (selectedVariationValues.length) {
        this.item_varian = selectedVariationValues.join('|');
    }
};

/**
 * Assigns category information to the product.
 * @param {dw.catalog.Product} apiProduct - The product object from the API.
 */
ProductData.prototype.assignCategories = function (apiProduct) {
    var masterProduct = apiProduct.variant ? apiProduct.variationModel.master : apiProduct;
    var category = masterProduct.getPrimaryCategory();

    if (!category && masterProduct.categories.length > 0) {
        category = masterProduct.categories[0];
    }

    if (!category) {
        return;
    }

    var categories = [];

    while (category.ID !== 'root') {
        categories.push(category);
        category = category.parent;
    }

    categories.reverse().forEach(function (category, i) {
        var index = i + 1;
        this['item_category' + (index > 1 ? index : '')] = category.displayName;
    }, this);
};

/**
 * Assigns attributes from a line item to the ProductData instance.
 * @param {dw.order.LineItem} lineItem - The line item object containing product attributes.
 */
ProductData.prototype.assignProductLineItemAttributes = function (lineItem) {
    if (!lineItem) {
        return;
    }

    this.quantity = lineItem.quantityValue;
    this.price = lineItem.adjustedPrice.divide(lineItem.quantityValue || 1).value;

    if (lineItem.priceAdjustments.length > 0) {
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
    }
};

module.exports = ProductData;
