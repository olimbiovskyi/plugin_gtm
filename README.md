# plugin_gtm: Storefront Reference Architecture (SFRA)

## Overview

This is the repository for the plugin_gtm plugin.
This plugin enhances the app_storefront_base cartridge by providing Google Tag Manager (GTM) functionality for Google Analytics 4, including the following capabilities:

-   Tracking various eCommerce events
-   Integration with Google Tag Manager

## Events Implemented

The following events have been implemented within the scope of this plugin:

| Event Name        | Description                                 |
| ----------------- | ------------------------------------------- |
| view_promotion    | Display of an internal promotional campaign |
| select_promotion  | Click on an internal promotional campaign   |
| view_item_list    | Display of a list of products               |
| select_item       | Click on a product of a list of products    |
| view_item         | View product information                    |
| add_to_cart       | Add an item to the cart                     |
| remove_from_cart  | Remove an item from the cart                |
| view_cart         | View the shopping cart                      |
| begin_checkout    | Begin the checkout process                  |
| add_shipping_info | Add shipping information during checkout    |
| add_payment_info  | Add payment information during checkout     |
| purchase          | Purchase one or more items                  |

### Event Groups

-   **Page Load Events**: Triggered immediately when the page is loaded.
-   **User Interaction Events**: Triggered when the customer interacts with the website.

## Cartridge Path Considerations

The plugin_gtm plugin requires the app_storefront_base cartridge. In your cartridge path, include the cartridges in the following order:

```
plugin_gtm:app_storefront_base
```

## Template Conflicts

Each template in the following table is present in multiple cartridges. If the file exists in the app_storefront_base cartridge and in this plugin cartridge, the plugin template overrides the base template. The presence of a template file in multiple plugin cartridges indicates a conflict that you have to resolve in a customization cartridge. However, if you are using only one of the conflicting plugin cartridges, no action is necessary.

| Template File                 | Cartridges                          | Location                                                             |
| ----------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| productTileImage.isml         | plugin_gtm<br />app_storefront_base | cartridge/templates/default/product/components/productTileImage.isml |
| productTileName.isml          | plugin_gtm<br />app_storefront_base | cartridge/templates/default/product/components/productTileName.isml  |
| productTile.isml              | plugin_gtm<br />app_storefront_base | cartridge/templates/default/product/productTile.isml                 |
| searchResultsNoDecorator.isml | plugin_gtm<br />app_storefront_base | cartridge/templates/default/search/searchResultsNoDecorator.isml     |

## Getting Started

1. Clone this repository. (The name of the top-level folder is plugin_gtm.)
2. In the top-level plugin_gtm folder, enter the following command: `npm install`. (This command installs all of the package dependencies required for this plugin.)
3. In the top-level plugin_gtm folder, edit the paths.base property in the package.json file. This property should contain a relative path to the local directory containing the Storefront Reference Architecture repository. For example:

```
"paths": {
    "base": "../storefront-reference-architecture/cartridges/app_storefront_base/"
}
```

4. In the top-level plugin_gtm folder, enter the following command: `npm run compile:js && npm run compile:scss`
5. In the top-level plugin_gtm folder, enter the following command: `npm run uploadCartridge`

## NPM scripts

Use the provided NPM scripts to compile and upload changes to your Sandbox.

### Compiling your application

-   `npm run compile:scss` - Compiles all scss files into css.
-   `npm run compile:js` - Compiles all js files and aggregates them.
-   `npm run build` - Compiles all js & scss files and aggregates them.

### Linting your code

`npm run lint` - Execute linting for all JavaScript and SCSS files in the project. You should run this command before committing your code.

### Watching for changes and uploading

`npm run watch` - Watches everything and recompiles (if necessary) and uploads to the sandbox. Requires a valid dw.json file at the root that is configured for the sandbox to upload.
