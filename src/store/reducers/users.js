import { UsersAction } from '../actions';
import { UsersDefaults } from './defaults';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = UsersDefaults] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function UsersReducer(state = UsersDefaults, action)
{
    switch (action.type)
    {
        // Gets all users,
        case UsersAction.Types.GET_ALL:
            return {
                ...state
            };

        // Fetches all users from service.
        case UsersAction.Types.FETCH_ALL:
            return {
                ...state,
                // Loader is not shown when data exists on store.
                loading: !state.users || Object.keys(state.users).length === 0
            };

        // Fetching users succeeded.
        case UsersAction.Types.FETCH_ALL_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };

        case UsersAction.Types.ADD_ANSWER:
            {
                const answer = action.payload.answer;
                const answers = state.users[answer.authedUser].answers;

                answers[answer.qid] = answer.answer;
            }

            return {
                ...state
            };

        case UsersAction.Types.ADD_QUESTION:
            {
                const question = action.payload;
                const questions = state.users[question.author].questions;

                questions.push(question.id);
            }

            return {
                ...state
            };

        // Any action error.
        case UsersAction.Types.ERROR:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        default:
            return state;
    }
}

export default UsersReducer;
