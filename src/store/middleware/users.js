import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Message } from 'semantic-ui-react';
import DataService from '../../services/_DATA';
import { Confirm } from '../../utils/Swal';
import UsersAction from '../actions/users';

function* getAll(action)
{
    try
    {
        const response = yield call(DataService._getUsers);
        yield put(UsersAction.Action(
            UsersAction.Types.GET_ALL_SUCCESS,
            { ...response }
        ));
    }
    catch (e)
    {
        Confirm('error', (
            <Message
                error
                header='There was some errors fetching users'
                list={ [
                    e.message,
                    'You must validate your internet connection.'
                ] }
            />
        ));

        yield put(UsersAction.Action(
            UsersAction.Types.ERROR,
            {
                Error: {
                    Type: action.Type,
                    Message: e.message
                }
            }
        ));
    }
}

export default function* init()
{
    yield takeLatest(UsersAction.Types.GET_ALL, getAll);
}
