import { QuestionsAction } from '../actions';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = {}] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function QuestionsReducer(state = {}, action)
{
    switch (action.type)
    {
        case QuestionsAction.Types.GET_ALL:
            return state;

        case QuestionsAction.Types.FETCH_ALL:
            return {
                ...state,
                loading: true
            };

        case QuestionsAction.Types.FETCH_ALL_SUCCESS:
            return {
                questions: Object.assign(
                    { ...state.questions },
                    {
                        [action.payload.id]: action.payload
                    }
                ),
                loading: false
            };

        case QuestionsAction.Types.CREATE:
            return {
                ...state,
                loading: true
            };

        case QuestionsAction.Types.CREATE_SUCCESS:
            return {
                questions: Object.assign(
                    { ...state.questions },
                    {
                        [action.payload.id]: action.payload
                    }
                ),
                loading: false
            };

        case QuestionsAction.Types.ERROR:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        default:
            return state;
    }
}

export default QuestionsReducer;
