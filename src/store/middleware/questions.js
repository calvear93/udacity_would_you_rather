import { all, call, takeLatest, put } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import { QuestionsAction } from '../actions';
import { PopupSuccess, PopupError, PutError } from './shared';

const messages = {
    getAll: {
        error: 'There was some errors fetching the questions'
    },
    create: {
        success: (author) => `Question with author "${ author }" created successfully!`,
        error: 'There was some errors creating the question'
    }
};

function* getAll(action)
{
    try
    {
        const response = yield call(DataService._getQuestions);
        console.log('>>>>>>', response);
        // yield put(SessionAction.Action(
        //     SessionAction.Types.LOGIN_SUCCESS,
        //     { ...response }
        // ));
        // action.payload.history.push('/main');
    }
    catch (e)
    {
        PopupError(e, messages.getAll.error);
        yield PutError(e, messages.getAll.error, QuestionsAction);
    }
}

function* create(action)
{
    try
    {
        const question = action.payload.question;
        const response = yield call(DataService._saveQuestion, question);

        yield put(QuestionsAction.Action(
            QuestionsAction.Types.FETCH_ALL_SUCCESS,
            { ...response }
        ));

        PopupSuccess(messages.create.success(question.author));

        action.payload.history.push('/main');
    }
    catch (e)
    {
        PopupError(e, messages.create.error);
        yield PutError(e, messages.create.error, QuestionsAction);
    }
}

export default function* init()
{
    yield all(
        yield takeLatest(QuestionsAction.Types.FETCH_ALL, getAll),
        yield takeLatest(QuestionsAction.Types.CREATE, create)
    );
}
