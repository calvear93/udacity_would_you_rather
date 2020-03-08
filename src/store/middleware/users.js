import { call, delay, put, take, takeLatest } from 'redux-saga/effects';
import UsersAction from '../actions/users';
import DataService from '../../services/_DATA';

function* getAll(action)
{
    try
    {
        const response = yield call(DataService._getUsers);
        yield put(UsersAction.Action(UsersAction.Types.CREATE, { ...response }));
    }
    catch (e)
    {
        yield put(UsersAction.Action(UsersAction.Types.ERROR, {
            Error: {
                Type: action.Type,
                Message: e.message
            }
        }));
    }
}

export default function* init()
{
    yield takeLatest(UsersAction.Types.GET_ALL, getAll);
}
