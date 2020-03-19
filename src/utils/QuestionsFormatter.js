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
                    accumulator[k] = q[k];
                    // Validates if the question was answered for current user.
                    accumulator.answered = accumulator.answered ?
                        accumulator.answered
                        : q[k].votes.any(v => v === user);

                    return accumulator;
                }, {})
        }
    ));
