'use strict';

module.exports = {
    /**
     * Executes functions from a list.
     * @param {Array} functionsList - List of function names to execute.
     * @param {Object} functionLibrary - Object containing the functions.
     * @param {Array} args - Arguments to be passed to each function.
     */
    executeFunctions(functionsList, functionLibrary, args) {
        if (functionsList && functionLibrary) {
            functionsList.forEach((functionName) => {
                functionLibrary[functionName]?.apply(this, args);
            });
        }
    },

    /**
     * Retrieves data from a script tag with a specific type.
     * @param {string} type - The type of the data to retrieve.
     * @returns {Object|null} The parsed data object or null if parsing fails.
     */
    getData(type) {
        let data = null;

        try {
            data = JSON.parse($(`#gtm-${type}-data`).text());
        } catch (e) {
            // Handle error if necessary
        }

        return data;
    }
};
