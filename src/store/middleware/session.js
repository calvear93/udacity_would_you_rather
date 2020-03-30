import { all, call, put, takeLatest } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import { SessionAction } from '../actions';
import { PopupError, PutError } from './shared';
import Cookies from 'js-cookie';

// Alerts messages.
const messages = {
    login: {
        error: 'There was some errors with your login attempt'
    },
    logout: {
        error: 'There was some errors with your logout attempt'
    }
};

/**
 * Saves user identity to the store.
 *
 * @param {*} action Trigger.
 */
function* login(action)
{
    try
    {
        const { userId, redirect, history } = action.payload;
        // Gets/validates user identity from the service.
        const response = yield call(DataService._getUser, userId);

        // NOTE: I consider data should be stored in
        // minimum sources possible, so, this info is
        // in users Redux partition.
        delete response.answers;
        delete response.questions;

        yield put(SessionAction.Action(
            SessionAction.Types.LOGIN_SUCCESS,
            { ...response }
        ));
        // Redirects the app to the main page.
        // history.push('/main');
        history.push((!redirect || redirect === '/main/login') ? '/main' : redirect);
        yield put(SessionAction.Action(
            SessionAction.Types.REDIRECT_SUCCESS
        ));

        // Cookie expires in 1 hou.
        // Cookies.set(
        //     SessionAction.CookiesKeys.SESSION,
        //     {
        //         ...response,
        //         authenticated: true,
        //         loading: false
        //     },
        //     {
        //         expires: new Date(new Date().getTime() + 60 * 60 * 1000)
        //     }
        // );
    }
    catch (e)
    {
        PopupError(e, messages.login.error);
        yield PutError(e, messages.login.error, SessionAction);
    }
}

/**
 * Removes the current user from session (store).
 *
 * @param {*} action Trigger.
 */
function* logout(action)
{
    try
    {
        action.payload.history.push('/main/login');

        yield put(SessionAction.Action(
            SessionAction.Types.LOGOUT_SUCCESS
        ));

        // Cookies.remove(SessionAction.CookiesKeys.SESSION);
    }
    catch (e)
    {
        yield PutError(e, messages.logout.error, SessionAction);
    }
}

/**
 * Redirects to login.
 *
 * @param {*} action Trigger.
 */
function* redirect(action)
{
    try
    {
        action.payload.history.push('/main/login');
    }
    catch (e)
    {
        yield PutError(e, messages.logout.error, SessionAction);
    }
}

/**
 * Combining function.
 *
 * @export
 */
export default function* init()
{
    yield all(
        yield takeLatest(SessionAction.Types.LOGIN, login),
        yield takeLatest(SessionAction.Types.LOGOUT, logout),
        yield takeLatest(SessionAction.Types.REDIRECT_ATTEMPT, redirect)
    );
}
