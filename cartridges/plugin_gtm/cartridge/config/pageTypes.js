'use strict';

module.exports = {
    home: ['Home-Show', 'Default-Start'],
    content: ['Page-Show', 'Search-Content'],
    cart: ['Cart-Show'],
    checkout: ['Checkout-Begin'],
    storelocator: ['Stores-Find', 'Stores-FindStores'],
    account: [
        'Account-Show',
        'Account-EditProfile',
        'Account-EditPassword',
        'Account-PasswordReset',
        'Account-SetNewPassword',
        'Account-SaveNewPassword',
        'Login-Show',
        'Order-Track',
        'Order-Details',
        'Order-History',
        'Address-List',
        'Address-AddAddress',
        'Address-EditAddress',
        'PaymentInstruments-List',
        'PaymentInstruments-AddPayment'
    ],
    error: [
        'CSRF-Fail',
        'Default-Offline',
        'Login-OAuthLogin',
        'RedirectURL-Start',
        'Home-ErrorNotFound',
        'Login-OAuthReentry'
    ]
};
