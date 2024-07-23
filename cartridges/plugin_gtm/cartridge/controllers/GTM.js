'use strict';

var server = require('server');

/**
 * Renders the customer data for GTM.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the chain.
 */
server.get('CustomerData', server.middleware.include, function (req, res, next) {
    var CustomerData = require('*/cartridge/models/gtm/customerData');
    var gtmCustomerData = new CustomerData(customer);

    res.render('/common/gtmCustomerData', {
        gtmCustomerData: gtmCustomerData
    });

    next();
});

module.exports = server.exports();
