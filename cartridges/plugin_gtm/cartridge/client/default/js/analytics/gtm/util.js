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
     * Recursively merges properties of source objects into the target object.
     * If a property is an array or an object, the merge is done deeply.
     * Arrays are concatenated, and objects are merged recursively.
     * @param {Object} target - The target object that will receive the properties.
     * @param {...Object} sources - One or more source objects whose properties will be merged into the target.
     * @returns {Object} The target object after merging.
     */
    deepAssign(target, ...sources) {
        return sources
            .filter((obj) => obj !== null && obj !== undefined)
            .reduce((prev, obj) => {
                Object.keys(obj).forEach((key) => {
                    const pVal = prev[key];
                    const oVal = obj[key];

                    if (Array.isArray(pVal) && Array.isArray(oVal)) {
                        prev[key] = [...pVal, ...oVal];
                    } else if (typeof pVal === 'object' && typeof oVal === 'object') {
                        prev[key] = deepAssign({ ...pVal }, oVal);
                    } else {
                        prev[key] = oVal;
                    }
                });

                return prev;
            }, target);
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
