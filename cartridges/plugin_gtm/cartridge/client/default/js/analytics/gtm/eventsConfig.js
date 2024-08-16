module.exports = {
    global: {
        events: {
            pageViewEvents: [
                'viewGlobal',
                'viewPromotion'
            ],
            interactionEvents: [
                'addToCart',
                'removeFromCart',
                'selectItem',
                'selectPromotion',
            ]
        }
    },
    pages: {
        pdp: {
            pageViewEvents: [
                'viewItem'
            ],
            interactionEvents: []
        },
        plp: {
            pageViewEvents: [
                'viewItemList'
            ],
            interactionEvents: []
        },
        search: {
            pageViewEvents: [
                'viewItemList'
            ],
            interactionEvents: []
        },
        cart: {
            pageViewEvents: [
                'viewCart'
            ],
            interactionEvents: []
        },
        checkout: {
            pageViewEvents: [
                'beginCheckout'
            ],
            interactionEvents: [
                'addShippingInfo',
                'addPaymentInfo'
            ]
        },
        orderconfirmation: {
            pageViewEvents: [
                'purchase'
            ],
            interactionEvents: []
        },
    }
};
