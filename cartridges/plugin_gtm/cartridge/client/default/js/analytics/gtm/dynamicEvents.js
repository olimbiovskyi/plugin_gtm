'use strict';

module.exports = {
    /**
     * Handles item selection event.
     * @param {Object} analyticsData - The analytics data object.
     */
    selectItem(analyticsData) {
        $('body').on('click', '.js-product-link', function () {
            const $this = $(this);
            const gtmProductData = $this.closest('.js-gtm-list-item').data('gtmProductData');

            if (!gtmProductData) {
                return;
            }

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'select_item',
                ecommerce: {
                    items: [gtmProductData]
                }
            });
        });
    },

    /**
     * Handles promotion selection event.
     * @param {Object} analyticsData - The analytics data object.
     */
    selectPromotion(analyticsData) {
        $('body').on('click', '.js-gtm-promotion', function () {
            const $this = $(this);
            const gtmPromotionData = $this.data('gtmPromotionData');

            if (!gtmPromotionData) {
                return;
            }

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'select_promotion',
                ecommerce: {
                    items: [gtmPromotionData]
                }
            });
        });
    },

    /**
     * Handles add to cart event.
     * @param {Object} analyticsData - The analytics data object.
     */
    addToCart(analyticsData) {
        $('body').on('product:afterAddToCart', function (e, data) {
            const { cart, pliUUID } = data;
            const items = cart?.items || [];

            const addedProduct = items.find((item) => item.UUID === pliUUID);

            if (!addedProduct || !addedProduct.gtmProductData) {
                return;
            }

            const { globalData } = analyticsData;

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'add_to_cart',
                ecommerce: {
                    currency: globalData.currencyCode,
                    items: [addedProduct.gtmProductData]
                }
            });
        });
    },

    /**
     * Handles remove from cart event.
     * @param {Object} analyticsData - The analytics data object.
     */
    removeFromCart(analyticsData) {
        $('body').on('product:afterRemoveFromCart', function (e, data) {
            const gtmProductData = data?.gtmProductData;

            if (!gtmProductData) {
                return;
            }

            const { globalData } = analyticsData;

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'remove_from_cart',
                ecommerce: {
                    currency: globalData.currencyCode,
                    items: [gtmProductData]
                }
            });
        });
    },

    /**
     * Handles add shipping info event.
     * @param {Object} analyticsData - The analytics data object.
     */
    addShippingInfo(analyticsData) {
        $('body').on('checkout:shippingSubmitted', function (e, data) {
            const order = data?.order;

            if (!order || !order.gtmOrderData) {
                return;
            }

            const { globalData } = analyticsData;
            const shipping = order?.shipping || [];

            const shippingMethods = shipping
                .map((shipping) => {
                    return shipping?.selectedShippingMethod?.displayName;
                })
                .filter(Boolean);

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'add_shipping_info',
                ecommerce: {
                    value: order.gtmOrderData?.totals?.value,
                    shipping_tier: shippingMethods.join(';'),
                    currency: globalData.currencyCode,
                    items: order.gtmOrderData.items
                }
            });
        });
    },

    /**
     * Handles add payment info event.
     * @param {Object} analyticsData - The analytics data object.
     */
    addPaymentInfo(analyticsData) {
        $('body').on('checkout:paymentSubmitted', function (e, data) {
            const order = data?.order;

            if (!order || !order.gtmOrderData) {
                return;
            }

            const { globalData } = analyticsData;
            const billing = order?.billing || {};
            const payment = billing?.payment || {};
            const selectedPaymentInstruments = payment?.selectedPaymentInstruments || [];

            const paymentMethods = selectedPaymentInstruments
                .map((paymentInstrument) => {
                    return paymentInstrument?.paymentMethod;
                })
                .filter(Boolean);

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'add_payment_info',
                ecommerce: {
                    value: order.gtmOrderData?.totals?.value,
                    payment_type: paymentMethods.join(';'),
                    currency: globalData.currencyCode,
                    items: order.gtmOrderData.items
                }
            });
        });
    }
};
