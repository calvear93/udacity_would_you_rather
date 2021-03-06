import { QuestionsAction } from '../actions';
import { QuestionDefaults } from './defaults';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = QuestionDefaults] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function QuestionsReducer(state = QuestionDefaults, action)
{
    switch (action.type)
    {
        // Gets all question from store.
        case QuestionsAction.Types.GET_ALL:
            return {
                ...state
            };

        // Adds a new question.
        case QuestionsAction.Types.CREATE:
            return {
                ...state,
                loading: true
            };

        // Create question action succeeded.
        case QuestionsAction.Types.CREATE_SUCCESS:

            return {
                ...state,
                inputs: QuestionDefaults.inputs,
                questions: Object.assign(
                    { ...state.questions },
                    {
                        [action.payload.id]: action.payload
                    }
                ),
                loading: false
            };

        // Deletes a question.
        case QuestionsAction.Types.DELETE:
            delete state.questions[action.payload.id];

            return {
                ...state,
                loading: false
            };

        // Fetches all question from service.
        case QuestionsAction.Types.FETCH_ALL:
            return {
                ...state,
                // Loader doesn't show when any data is already loaded in store.
                loading: !state.questions || Object.keys(state.questions).length === 0
            };

        // Fetching action succeeded.
        case QuestionsAction.Types.FETCH_ALL_SUCCESS:
            return {
                ...state,
                questions: action.payload,
                loading: false
            };

        // Answer a question.
        case QuestionsAction.Types.ANSWER:
            return {
                ...state,
                loading: true
            };

        case QuestionsAction.Types.ANSWER_SUCCESS:
            {
                const answer = action.payload.answer;
                const question = state.questions[answer.qid][answer.answer];

                question.votes = [
                    ...question.votes,
                    answer.authedUser
                ];
            }

            return {
                ...state,
                loading: false
            };

        case QuestionsAction.Types.ANSWER_ERROR:
            {
                const answer = action.payload.answer;
                const question = state.questions[answer.qid][answer.answer];

                question.votes.remove(answer.authedUser);
            }

            return {
                ...state,
                loading: false
            };

        // Saves current inputs values for New Question page.
        case QuestionsAction.Types.SAVE_INPUT:

            return {
                ...state,
                inputs: Object.assign(
                    { ...state.inputs },
                    {
                        [action.payload.id]: action.payload
                    }
                )
            };

        // Error on some action.
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
