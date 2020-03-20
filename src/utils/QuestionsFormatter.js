/**
 * Merge application data in questions.
 *
 * @param {string} user User Id.
 * @param {Array} options Application options Ids.
 * @param {any} questions All question.
 * @param {any} users All users.
 *
 * @returns {any} Questions with authors assigned.
 */
export const QuestionsMergeWithAuthors = (user, options, questions, users) => Object.values(questions)
    .map(q => (
        {
            id: q.id,
            author: users[q.author],
            ...Object.keys(q)
                .filter(k => options.includes(k))
                .reduce((accumulator, k) =>
                {
                    q[k].id = k;
                    accumulator[k] = q[k];
                    // Validates if the question was answered for current user.
                    accumulator.answered = accumulator.answered ?
                        accumulator.answered
                        : q[k].votes.any(v => v === user);

                    return accumulator;
                }, {})
        }
    ));

/**
 * Merge application data for one question.
 *
 * @param {string} id Question Id.
 * @param {string} user User Id.
 * @param {Array} options Application options Ids.
 * @param {any} questions All question.
 * @param {any} users All users.
 *
 * @returns {any} Questions with authors assigned.
 */
export const QuestionMergeWithAuthor = (id, user, options, questions, users) =>
{
    const question = questions[id];

    if (!question)
    {
        return undefined;
    }

    return {
        id,
        author: users[question.author],
        ...Object.keys(question)
            .filter(k => options.includes(k))
            .reduce((accumulator, k) =>
            {
                question[k].id = k;
                accumulator[k] = question[k];
                // Validates if the question was answered for current user.
                accumulator.answered = accumulator.answered ?
                    accumulator.answered
                    : question[k].votes.any(v => v === user);

                return accumulator;
            }, {})
    };
};

/**
 * Merge application data in questions.
 *
 * @param {string} user User Id.
 * @param {Array} options Application options Ids.
 * @param {any} questions All question.
 * @param {any} users All users.
 *
 * @returns {any} Questions with authors assigned.
 */
export const QuestionsMergeWithAuthorsOptionsAsArray = (user, options, questions, users) => Object.values(questions)
    .map(q => (
        {
            id: q.id,
            author: users[q.author],
            ...Object.keys(q)
                .filter(k => options.includes(k))
                .reduce((accumulator, k) =>
                {
                    q[k].id = k;
                    // Validates if the question was answered for current user.
                    accumulator.answered = accumulator.answered ?
                        accumulator.answered
                        : q[k].votes.any(v => v === user);

                    accumulator.options.push(q[k]);

                    return accumulator;
                }, { answered: false, options: [] })
        }
    ));

/**
 * Merge application data for one question.
 *
 * @param {string} id Question Id.
 * @param {string} user User Id.
 * @param {Array} options Application options Ids.
 * @param {any} questions All question.
 * @param {any} users All users.
 *
 * @returns {any} Questions with authors assigned.
 */
export const QuestionMergeWithAuthorOptionsAsArray = (id, user, options, questions, users) =>
{
    const question = questions[id];

    if (!question)
    {
        return undefined;
    }

    return {
        id,
        author: users[question.author],
        ...Object.keys(question)
            .filter(k => options.includes(k))
            .reduce((accumulator, k) =>
            {
                question[k].id = k;
                // Validates if the question was answered for current user.
                accumulator.answered = accumulator.answered ?
                    accumulator.answered
                    : question[k].votes.any(v => v === user);

                accumulator.options.push(question[k]);

                return accumulator;
            }, { answered: false, options: [] })
    };
};
