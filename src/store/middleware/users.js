import { call, put, takeLatest } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import UsersAction from '../actions/users';

function* getAll(action)
{
    try
    {
        const response = yield call(DataService._getUsers);
        yield put(UsersAction.Action(
            UsersAction.Types.UPDATE,
            { ...response }
        ));
    }
    catch (e)
    {
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
