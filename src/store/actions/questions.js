import { createAction, createActionTypes } from './shared';

// Store partition key.
const KEY = 'QUESTIONS';

/**
 * Redux Action container.
 *
 * @class QuestionsAction
 * @export QuestionsAction
 */
const QuestionsAction =
{

    /**
     * Action Store Key.
     *
     * @memberof QuestionsAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof QuestionsAction
     */
    Types: createActionTypes(KEY, {
        GET_ALL: 'GET_ALL',
        FETCH_ALL: 'FETCH_ALL',
        FETCH_ALL_SUCCESS: 'FETCH_ALL_SUCCESS',
        CREATE: 'CREATE',
        CREATE_SUCCESS: 'CREATE_SUCCESS',
        ANSWER: 'ANSWER',
        ANSWER_SUCCESS: 'ANSWER_SUCCESS',
        ANSWER_REMOVE: 'ANSWER_REMOVE',
        SAVE_INPUT: 'SAVE_INPUT',
        DELETE: 'DELETE',
        ERROR: 'ERROR'
    }),

    /**
     * Keys for cached data.
     *
     * @memberof QuestionsAction
     */
    CacheKeys: createActionTypes(KEY, {
        QUESTIONS: 'QUESTIONS'
    }),

    /**
     * Returns the action.
     *
     * @param {Symbol} type Action type.
     * @param {any} payload Data involved in the action.
     * @memberof QuestionsAction
     * @returns {func} Action.
     */
    Action: (type, payload) => createAction(KEY, type, payload)
};

export default Object.freeze(QuestionsAction);
