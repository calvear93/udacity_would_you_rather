import { all, call, put, takeLatest } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import { SessionAction } from '../actions';
import { PopupError, PutError } from './shared';

const messages = {
    login: {
        error: 'There was some errors with your login attempt'
    },
    logout: {
        error: 'There was some errors with your logout attempt'
    }
};

function* login(action)
{
    try
    {
        const response = yield call(DataService._getUser, action.payload.userId);

        yield put(SessionAction.Action(
            SessionAction.Types.LOGIN_SUCCESS,
            { ...response }
        ));

        action.payload.history.push('/main');
    }
    catch (e)
    {
        PopupError(e, messages.login.error);
        yield PutError(e, messages.login.error, SessionAction);
    }
}

function* logout(action)
{
    try
    {
        action.payload.history.push('/main/login');

        yield put(SessionAction.Action(
            SessionAction.Types.LOGOUT_SUCCESS
        ));
    }
    catch (e)
    {
        yield PutError(e, messages.logout.error, SessionAction);
    }
}

export default function* init()
{
    yield all(
        yield takeLatest(SessionAction.Types.LOGIN, login),
        yield takeLatest(SessionAction.Types.LOGOUT, logout)
    );
}
