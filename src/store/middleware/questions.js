import { all, call, takeLatest } from 'redux-saga/effects';
import DataService from '../../services/_DATA';
import { QuestionsAction } from '../actions';
import { PopupError, PutError } from './shared';

const messages = {
    getAll: {
        error: 'There was some errors fetching the questions'
    },
    create: {
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
        const response = yield call(DataService._saveQuestion, action.payload);
        console.log('>>>>>>', response);
        // yield put(SessionAction.Action(
        //     SessionAction.Types.LOGIN_SUCCESS,
        //     { ...response }
        // ));
        // action.payload.history.push('/main');
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
        yield takeLatest(QuestionsAction.Types.GET_ALL, getAll),
        yield takeLatest(QuestionsAction.Types.CREATE, create)
    );
}
