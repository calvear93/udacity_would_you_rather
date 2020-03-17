import { all, call, takeLatest, put } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import { QuestionsAction } from '../actions';
import { Cache, PopupSuccess, PopupError, PutError } from './shared';

// Alerts messages.
const messages = {
    fetchAll: {
        error: 'There was some errors fetching the questions'
    },
    create: {
        success: 'Question created successfully!',
        error: 'There was some errors creating the question'
    }
};

const keys = {
    questions: `${ QuestionsAction.Key }::questions`
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
 * Loads all questions from service to the store.
 */
function* fetchAll()
{
    try
    {
        // Gets the questions.
        const response = yield Cache.get( keys.questions ) || call(DataService._getQuestions);
        // Calls success event/action for finish the operation.
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.FETCH_ALL_SUCCESS,
            { ...response }
        ));

        Cache.set(keys.questions, response);
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
        // Calls success event/action for finish the operation.
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.CREATE_SUCCESS,
            { ...response }
        ));
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
 * Combining function.
 *
 * @export
 */
export default function* init()
{
    yield all(
        yield takeLatest(QuestionsAction.Types.GET_ALL, getAll),
        yield takeLatest(QuestionsAction.Types.FETCH_ALL, fetchAll),
        yield takeLatest(QuestionsAction.Types.CREATE, create)
    );
}
