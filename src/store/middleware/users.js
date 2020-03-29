import { all, call, put, takeLatest } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import UsersAction from '../actions/users';
import { PutError } from './shared';

// Alerts messages.
const messages = {
    fetchAll: {
        error: 'There was some errors fetching users'
    }
};

/**
 * Gets all users from the store and triggers update.
 */
function* getAll()
{
    // Whiles rendering uses current data, calls fetching action for updating it.
    yield put(UsersAction.Action(UsersAction.Types.FETCH_ALL));
}

/**
 * Fetches all users from service.
 */
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

/**
 * Combining function.
 *
 * @export
 */
export default function* init()
{
    yield all(
        yield takeLatest(UsersAction.Types.GET_ALL, getAll),
        yield takeLatest(UsersAction.Types.FETCH_ALL, fetchAll)
    );
}
