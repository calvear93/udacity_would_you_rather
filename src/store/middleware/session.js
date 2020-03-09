import { call, put, all, takeLatest } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import { SessionAction } from '../actions';

function* login(action)
{
    try
    {
        const response = yield call(DataService._getUser, action.payload.userId);
        yield put(SessionAction.Action(
            SessionAction.Types.LOGIN_SUCCESS,
            { ...response }
        ));
    }
    catch (e)
    {
        yield put(SessionAction.Action(
            SessionAction.Types.ERROR,
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
    yield all(
        yield takeLatest(SessionAction.Types.LOGIN, login)
    );
}
