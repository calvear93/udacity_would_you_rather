import { call, put, takeLatest } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import UsersAction from '../actions/users';
import { PutError } from './shared';

const messages = {
    fetchAll: {
        error: 'There was some errors fetching users'
    }
};

function* fetchAll()
{
    try
    {
        const response = yield call(DataService._getUsers);

        yield put(UsersAction.Action(
            UsersAction.Types.FETCH_ALL_SUCCESS,
            { ...response }
        ));
    }
    catch (e)
    {
        yield PutError(e, messages.fetchAll.error, UsersAction);
    }
}

export default function* init()
{
    yield takeLatest(UsersAction.Types.FETCH_ALL, fetchAll);
}
