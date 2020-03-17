import React from 'react';
import { put } from 'redux-saga/effects';
import { Message } from 'semantic-ui-react';
import { Confirm } from '../../utils/Swal';
import NodeCache from 'node-cache';

/**
 * Shows a success popup.
 *
 * @param {string} message Message for show.
 * @returns {any} Popup.
 */
const PopupSuccess = (message) => Confirm('success', (
    <Message
        success
        header={ message }
    />
));

/**
 * Shows a error popup.
 *
 * @param {any} e Error.
 * @param {string} message Message for show.
 * @returns {any} Popup.
 */
const PopupError = (e, message) => Confirm('error', (
    <Message
        error
        header={ message }
        list={ [
            e.message,
            'You must validate your internet connection.'
        ] }
    />
));

/**
 * Dispatches a error.
 *
 * @param {*} e Error.
 * @param {*} message Message for show.
 * @param {*} actionDescriptor Action executing when error.
 */
const PutError = function* (e, message, actionDescriptor)
{
    yield put(actionDescriptor.Action(
        actionDescriptor.Types.ERROR,
        {
            error: {
                message,
                error: e.message
            }
        }
    ));
};

const Cache = new NodeCache();

export { Cache, PopupSuccess, PutError, PopupError };

