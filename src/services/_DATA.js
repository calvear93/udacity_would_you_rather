/* eslint-disable no-unused-vars */
import { v1 as uuid } from 'uuid';
import {
    Boy,
    MaleCostume,
    Female,
    SupportMale
} from '../assets/images/avatars';
import Cookies from 'js-cookie';

const USE_COOKIES = process.env.REACT_APP_PERSISTENCE_ENABLED === 'true';

const users = {
    sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: Female,
        answers: {
            '8xf0y6ziyjabvozdd253nd': 'optionOne',
            '6ni6ok3ym7mf1p33lnez': 'optionTwo',
            am8ehyc8byjqgar0jgpub9: 'optionTwo',
            loxhs1bqm25b708cmbf3g: 'optionTwo'
        },
        questions: [ '8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9' ]
    },
    tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: Boy,
        answers: {
            vthrdm985a262al8qx3do: 'optionOne',
            xj352vofupe1dqz9emx13r: 'optionTwo'
        },
        questions: [ 'loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do' ]
    },
    johndoe: {
        id: 'johndoe',
        name: 'John Doe',
        avatarURL: MaleCostume,
        answers: {
            xj352vofupe1dqz9emx13r: 'optionOne',
            vthrdm985a262al8qx3do: 'optionTwo',
            '6ni6ok3ym7mf1p33lnez': 'optionTwo'
        },
        questions: [ '6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r' ]
    },
    crawis: {
        id: 'crawis',
        name: 'Cristopher Alvear',
        avatarURL: SupportMale,
        answers: {},
        questions: []
    }
};
const questions = {
    '8xf0y6ziyjabvozdd253nd': {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
            votes: [ 'sarahedo' ],
            text: 'have horrible short term memory'
        },
        optionTwo: {
            votes: [],
            text: 'have horrible long term memory'
        }
    },
    '6ni6ok3ym7mf1p33lnez': {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'johndoe',
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: 'become a superhero'
        },
        optionTwo: {
            votes: [ 'johndoe', 'sarahedo' ],
            text: 'become a supervillain'
        }
    },
    am8ehyc8byjqgar0jgpub9: {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'sarahedo',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'be telekinetic'
        },
        optionTwo: {
            votes: [ 'sarahedo' ],
            text: 'be telepathic'
        }
    },
    loxhs1bqm25b708cmbf3g: {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'tylermcginnis',
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: 'be a front-end developer'
        },
        optionTwo: {
            votes: [ 'sarahedo' ],
            text: 'be a back-end developer'
        }
    },
    vthrdm985a262al8qx3do: {
        id: 'vthrdm985a262al8qx3do',
        author: 'tylermcginnis',
        timestamp: 1489579767190,
        optionOne: {
            votes: [ 'tylermcginnis' ],
            text: 'find $50 yourself'
        },
        optionTwo: {
            votes: [ 'johndoe' ],
            text: 'have your best friend find $500'
        }
    },
    xj352vofupe1dqz9emx13r: {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'johndoe',
        timestamp: 1493579767190,
        optionOne: {
            votes: [ 'johndoe' ],
            text: 'write JavaScript'
        },
        optionTwo: {
            votes: [ 'tylermcginnis' ],
            text: 'write Swift'
        }
    }
};

// Saves data in cookies for persistence.
const proxyHandler = {
    set: (target, key, value) =>
    {
        target[key] = value;
        Cookies.set(key, value);

        return true;
    }
};
// Gets cookies.
const usersCookie = USE_COOKIES ? Cookies.get('users') : undefined;
const questionsCookie = USE_COOKIES ? Cookies.get('questions') : undefined;
// Proxy for data persistence in cookies.
let data = new Proxy({
    users: (usersCookie && JSON.parse(usersCookie)) || users,
    questions: (questionsCookie && JSON.parse(questionsCookie)) || questions
}, proxyHandler);

export default class DataService
{
    static _getUser(id)
    {
        return new Promise((res, rej) =>
        {
            setTimeout(() => res({ ...data.users[id] }), 1000);
        });
    }

    static _getUsers()
    {
        return new Promise((res, rej) =>
        {
            setTimeout(() => res({ ...data.users }), 1000);
        });
    }

    static _getQuestions()
    {
        return new Promise((res, rej) =>
        {
            setTimeout(() => res({ ...data.questions }), 1000);
        });
    }

    static formatQuestion({ optionOneText, optionTwoText, author })
    {
        return {
            id: uuid(),
            timestamp: Date.now(),
            author,
            optionOne: {
                votes: [],
                text: optionOneText
            },
            optionTwo: {
                votes: [],
                text: optionTwoText
            }
        };
    }

    static _saveQuestion(question)
    {
        return new Promise((res, rej) =>
        {
            const authedUser = question.author;
            question.id = uuid();
            question.creation_timestamp = Date.now();
            const formattedQuestion = question;

            // const formattedQuestion = this.formatQuestion(question); // Not necessary.

            setTimeout(() =>
            {
                data.questions = {
                    ...data.questions,
                    [formattedQuestion.id]: formattedQuestion
                };

                data.users = {
                    ...data.users,
                    [authedUser]: {
                        ...data.users[authedUser],
                        questions: data.users[authedUser].questions.concat([ formattedQuestion.id ])
                    }
                };

                res(formattedQuestion);
            }, 1000);
        });
    }

    static _saveQuestionAnswer({ authedUser, qid, answer })
    {
        return new Promise((res, rej) =>
        {
            setTimeout(() =>
            {
                data.users = {
                    ...data.users,
                    [authedUser]: {
                        ...data.users[authedUser],
                        answers: {
                            ...data.users[authedUser].answers,
                            [qid]: answer
                        }
                    }
                };

                data.questions = {
                    ...data.questions,
                    [qid]: {
                        ...data.questions[qid],
                        [answer]: {
                            ...data.questions[qid][answer],
                            votes: data.questions[qid][answer].votes.concat([ authedUser ])
                        }
                    }
                };

                res();
            }, 500);
        });
    }
}
