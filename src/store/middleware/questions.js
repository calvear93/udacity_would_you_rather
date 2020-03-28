import { all, call, take, race, fork, takeEvery, takeLatest, put, select, delay } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import { QuestionsAction, UsersAction } from '../actions';
import { PopupSuccess, PopupError, PutError } from './shared';
import NodeCache from 'node-cache';

const Cache = new NodeCache({
    stdTTL: 30,
    checkperiod: 120
});

// Alerts messages.
const messages = {
    fetchAll: {
        error: 'There was some errors fetching the questions'
    },
    create: {
        success: 'Question created successfully!',
        error: 'There was some errors creating the question'
    },
    answer: {
        success: 'Question answered successfully!',
        error: 'There was some errors answering the question'
    }
};

/**
 * Gets all questions from the store and triggers update.
 */
function* getAll()
{
    // Whiles rendering uses current data, calls fetching action for updating it.
    yield put(QuestionsAction.Action(QuestionsAction.Types.FETCH_ALL));
}

/**
 * Validates users info from store for questions rendering.
 */
function* validateUsers()
{
    const users = yield select(store => store[UsersAction.Key].users);

    if (!users)
    {
        yield put(UsersAction.Action(UsersAction.Types.FETCH_ALL));
    }
}

/**
 * Loads all questions from service to the store.
 *
 * @param {bool} force Forces to fetch all questions.
 */
function* fetchAll({ payload: { force = false } = {} })
{
    try
    {
        // Validates users info for questions rendering.
        yield validateUsers();
        // Gets question stored in cache.
        const cache = force ? undefined : Cache.get( QuestionsAction.CacheKeys.QUESTIONS );
        // Gets the questions from service if cache is empty.
        const response = yield cache || call(DataService._getQuestions);
        // Calls success event/action for finish the operation.
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.FETCH_ALL_SUCCESS,
            { ...response }
        ));
        // Stores the question in cache if it doesn't cached.
        cache || Cache.set(QuestionsAction.CacheKeys.QUESTIONS, response);
    }
    catch (e)
    {
        PopupError(e, messages.fetchAll.error);
        yield PutError(e, messages.fetchAll.error, QuestionsAction);
    }
}

/**
 * Adds a new question to the store.
 *
 * @param {*} action Trigger.
 */
function* create(action)
{
    try
    {
        // Saves the question to the service.
        const response = yield call(DataService._saveQuestion, action.payload.question);
        // Adds the new question to users data.
        yield put(UsersAction.Action(
            UsersAction.Types.ADD_QUESTION,
            { ...response }
        ));
        // Calls success event/action for finish the operation.
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.CREATE_SUCCESS,
            { ...response }
        ));
        // Removes current cached questions.
        Cache.del(QuestionsAction.CacheKeys.QUESTIONS);
        // Success popup.
        PopupSuccess(messages.create.success);
        // Redirects the app to main page.
        action.payload.history.push('/main');
    }
    catch (e)
    {
        PopupError(e, messages.create.error);
    }
}

/**
 * Creates an answer to a question.
 *
 * @param {*} action Trigger.
 */
function* answer(action)
{
    try
    {
        // Saves the answer for the question.
        yield call(DataService._saveQuestionAnswer, action.payload.answer);

        // Adds the answer to users data.
        yield put(UsersAction.Action(
            UsersAction.Types.ADD_ANSWER,
            action.payload
        ));
        // Calls success event/action for finish the operation.
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.ANSWER_SUCCESS,
            action.payload
        ));

        action.payload.history.push(`/summary/${ action.payload.answer.qId }`);

        // Calls fetch action for questions.
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.FETCH_ALL,
            { force: true } // force to not use cache.
        ));

        // // Waits for first action to be triggered.
        // const { success } = yield race({ // just now I don't mind the error.
        //     success: take(QuestionsAction.Types.FETCH_ALL_SUCCESS),
        //     error: take(QuestionsAction.Types.ERROR)
        // });

        // // If success, all is ok.
        // if (success)
        // {
        //     // Success popup.
        //     PopupSuccess(messages.answer.success);
        //     // Redirects the app to main page.
        //     action.payload.history.push(`/summary/${ action.payload.answer.qId }`);
        // }
        // else // Error fetching questions.
        // {
        //     throw new Error('Questions fetchAll cannot be resolved');
        // }
    }
    catch (e)
    {
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.ANSWER_ERROR,
            action.payload
        ));
        PopupError(e, messages.answer.error);
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
        yield takeLatest(QuestionsAction.Types.GET_ALL, getAll),
        yield takeLatest(QuestionsAction.Types.FETCH_ALL, fetchAll),
        yield takeLatest(QuestionsAction.Types.CREATE, create),
        yield takeLatest(QuestionsAction.Types.ANSWER, answer)
    );
}
