import { createAction, createActionTypesMirroringUnique } from './shared';

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
    Types: createActionTypesMirroringUnique([
        'GET_ALL',
        'FETCH_ALL',
        'FETCH_ALL_SUCCESS',
        'CREATE',
        'CREATE_SUCCESS',
        'DELETE',
        'ANSWER',
        'ANSWER_SUCCESS',
        'ANSWER_REMOVE',
        'DELETE',
        'ERROR'
    ]),

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
