'use strict';

var server = require('server');

server.extend(module.superModule);

/**
 * Appends GTM product data to the RemoveProductLineItem route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the chain.
 */
server.append('RemoveProductLineItem', function (req, res, next) {
    var gtmHelpers = require('*/cartridge/scripts/helpers/gtmHelpers');

    if (!gtmHelpers.isGTMEnabled()) {
        return next();
    }

    var viewData = res.getViewData();

    if (viewData.error || viewData.errorMessage) {
        return next();
    }

    var ProductMgr = require('dw/catalog/ProductMgr');
    var product = ProductMgr.getProduct(req.querystring.pid);

    if (!product) {
        return next();
    }

    var ProductData = require('*/cartridge/models/gtm/productData');
    var gtmProductData = new ProductData(product);

    res.json({
        gtmProductData: gtmProductData
    });

    return next();
});

module.exports = server.exports();
