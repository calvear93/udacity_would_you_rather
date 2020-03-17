import { all, call, takeLatest, put } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import { QuestionsAction } from '../actions';
import { Cache, PopupSuccess, PopupError, PutError } from './shared';

// Alerts messages.
const messages = {
    getAll: {
        error: 'There was some errors fetching the questions'
    },
    create: {
        success: (author) => `Question with author "${ author }" created successfully!`,
        error: 'There was some errors creating the question'
    }
};

const keys = {
    getAll: `${ QuestionsAction.Key }_getAll`
};

/**
 * Loads all questions from service to the store.
 */
function* getAll()
{
    try
    {
        // Gets the questions.
        const response = yield Cache.get( keys.getAll ) || call(DataService._getQuestions);
        // Calls success event/action for finish the operation.
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.FETCH_ALL_SUCCESS,
            { ...response }
        ));

        Cache.set(keys.getAll, response);
    }
    catch (e)
    {
        PopupError(e, messages.getAll.error);
        yield PutError(e, messages.getAll.error, QuestionsAction);
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
        const question = action.payload.question;
        // Saves the question to the service.
        const response = yield call(DataService._saveQuestion, question);
        // Calls success event/action for finish the operation.
        yield put(QuestionsAction.Action(
            QuestionsAction.Types.CREATE_SUCCESS,
            { ...response }
        ));
        // Success popup.
        PopupSuccess(messages.create.success(question.author));
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
        yield takeLatest(QuestionsAction.Types.FETCH_ALL, getAll),
        yield takeLatest(QuestionsAction.Types.CREATE, create)
    );
}
