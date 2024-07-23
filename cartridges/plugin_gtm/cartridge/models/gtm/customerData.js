'use strict';

/**
 * Represents customer data based on the current customer session.
 * @constructor
 * @param {dw.customer.Customer} currentCustomer - The current customer object.
 */
function CustomerData(currentCustomer) {
    this.user_status = currentCustomer.authenticated ? 'registered' : 'guest';

    if (currentCustomer.authenticated) {
        this.user_id = currentCustomer.profile.customerNo;
        this.user_email = this.getCustomerEmail(currentCustomer.profile.email);
    }
}

/**
 * Hashes the given email using SHA-256.
 * @param {string} email - The email to be hashed.
 * @returns {string} The hashed email.
 */
CustomerData.prototype.getCustomerEmail = function (email) {
    var MessageDigest = require('dw/crypto/MessageDigest');
    var digested = new MessageDigest('SHA-256');

    return digested.digest(email);
};

module.exports = CustomerData;
