'use strict';

/**
 * Represents global data for the current session and locale.
 * @constructor
 * @param {string} pageType - The type of the page (e.g., 'home', 'content', 'cart', etc.).
 */
function GlobalData(pageType) {
    var localeData = this.getLocaleData(request.locale);

    this.page_type = pageType;
    this.page_country = localeData.country;
    this.page_language = localeData.language;
    this.currencyCode = session.currency.currencyCode;
}

/**
 * Gets the locale data for the current request.
 * @returns {dw.util.Locale} Locale data object.
 */
GlobalData.prototype.getLocaleData = function (currentLocale) {
    var Locale = require('dw/util/Locale');
    var locale = Locale.getLocale(currentLocale);

    return locale;
};

module.exports = GlobalData;
