import { all } from 'redux-saga/effects';
import sessionInit from './session';
import usersInit from './users';
import logger from './logger';

/**
 * Combine every sagas in parallel tasks.
 *
 * @export combineMiddleware
 */
export default function* combineMiddleware()
{
    yield all([
        logger(),
        sessionInit(),
        usersInit()
    ]);
}
