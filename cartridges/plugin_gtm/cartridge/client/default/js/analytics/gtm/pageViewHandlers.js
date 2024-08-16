'use strict';

module.exports = {
    /**
     * Pushes global view data to the data layer.
     * @param {Object} analyticsData - The analytics data object.
     */
    viewGlobal(analyticsData) {
        const { globalData, customerData } = analyticsData;
        const { page_type, page_country, page_language } = globalData;

        const data = {
            page_type,
            page_country,
            page_language,
            ...customerData
        };

        dataLayer.push(data);
    },

    /**
     * Pushes item view data to the data layer.
     * @param {Object} analyticsData - The analytics data object.
     */
    viewItem(analyticsData) {
        const { globalData, pageData } = analyticsData;

        dataLayer.push({ ecommerce: null });
        dataLayer.push({
            event: 'view_item',
            ecommerce: {
                currency: globalData.currencyCode,
                items: pageData.items
            }
        });
    },

    /**
     * Pushes item list view data to the data layer.
     * @param {Object} analyticsData - The analytics data object.
     */
    viewItemList(analyticsData) {
        const $gtmList = $('[data-gtm-list]');

        if (!$gtmList.length) {
            return;
        }

        $gtmList.each(function () {
            const $this = $(this);
            const listName = $this.data('gtmList');
            const items = [];

            $this.find('.js-gtm-list-item').each(function (index) {
                const gtmProductData = $(this).data('gtmProductData');

                if (!gtmProductData) {
                    return;
                }

                items.push({
                    index: index + 1,
                    ...gtmProductData
                });
            });

            if (!items.length) {
                return;
            }

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'view_item_list',
                ecommerce: {
                    item_list_name: listName,
                    items: items
                }
            });
        });
    },

    /**
     * Pushes cart view data to the data layer.
     * @param {Object} analyticsData - The analytics data object.
     */
    viewCart(analyticsData) {
        const { globalData, pageData } = analyticsData;

        dataLayer.push({ ecommerce: null });
        dataLayer.push({
            event: 'view_cart',
            ecommerce: {
                currency: globalData.currencyCode,
                items: pageData.items
            }
        });
    },

    /**
     * Pushes promotion view data to the data layer.
     * @param {Object} analyticsData - The analytics data object.
     */
    viewPromotion(analyticsData) {
        const $gtmPromotion = $('.js-gtm-promotion');

        if (!$gtmPromotion.length) {
            return;
        }

        const items = [];

        $gtmPromotion.each(function () {
            const $this = $(this);
            const gtmPromotionData = $this.data('gtmPromotionData');

            if (!gtmPromotionData) {
                return;
            }

            items.push(gtmPromotionData);
        });

        if (!items.length) {
            return;
        }

        dataLayer.push({ ecommerce: null });
        dataLayer.push({
            event: 'view_promotion',
            ecommerce: {
                items: items
            }
        });
    },

    /**
     * Pushes begin checkout data to the data layer.
     * @param {Object} analyticsData - The analytics data object.
     */
    beginCheckout(analyticsData) {
        const { globalData, pageData } = analyticsData;

        dataLayer.push({ ecommerce: null });
        dataLayer.push({
            event: 'begin_checkout',
            ecommerce: {
                value: pageData?.totals?.value,
                currency: globalData.currencyCode,
                items: pageData.items
            }
        });
    },

    /**
     * Pushes purchase data to the data layer.
     * @param {Object} analyticsData - The analytics data object.
     */
    purchase(analyticsData) {
        const { globalData, pageData } = analyticsData;

        dataLayer.push({ ecommerce: null });
        dataLayer.push({
            event: 'purchase',
            ecommerce: {
                currency: globalData.currencyCode,
                ...pageData.totals,
                items: pageData.items
            }
        });
    }
};
