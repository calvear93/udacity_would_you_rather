/**
 * Creates a new Redux Action.
 *
 * @export
 * @param {string} key Action store pointer.
 * @param {Symbol} type Action Type.
 * @param {any} payload Action args.
 * @returns {any} Action.
 */
export function createAction(key, type, payload)
{
    return {
        key,
        type,
        payload
    };
}

/**
 * Creates Redux Action Type from object.
 *
 * @export
 * @param {any} obj Dictionary with actions types for declare.
 * @returns {any} Freezed object for Redux Action Types.
 */
export function createActionTypes(obj)
{
    let types = {};

    for (const key in obj)
    {
        types[key] = obj[key];
    }

    return Object.freeze(types);
}

/**
 * Creates Redux Action Type from string array.
 *
 * @export
 * @param {any} array String array.
 * @returns {any} Freezed object for Redux Action Types.
 */
export function createActionTypesMirroring(array)
{
    return Object.freeze(
        array.reduce((keys, key) => (
            { ...keys, [key]: Symbol(key) }
        ), {})
    );
}
