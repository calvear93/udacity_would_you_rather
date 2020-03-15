import React from 'react';
import { put } from 'redux-saga/effects';
import { Message } from 'semantic-ui-react';
import { Confirm } from '../../utils/Swal';

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

export { PutError, PopupError };

