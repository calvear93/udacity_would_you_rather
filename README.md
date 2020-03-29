# Would You Rather Project

This is the code for the final assessment project for Udacity's React & Redux course.

"Would you rather" is a conversation or party game that poses a dilemma in the form of a question beginning with "would you rather". The dilemma can be between two supposedly good options, such as, "Would you rather have the power of flight or the power of invisibility?", two attractive choices such as "Would you rather have money or have fame?", or it can be between two supposedly bad options, for example, "Would you rather sleep with your best friend's lover or your lover's best friend?" The players, sometimes including the questioner, then must choose their answers. Answering "neither" or "both" is against the rules. This leads the players to debate their rationales. [(Wikipedia)](https://en.wikipedia.org/wiki/Would_you_rather)

## How to use

To get started deploying the project right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`
- start the development server with persistence `npm run start:persistence`

## Project

Project consist of a **React/Redux** single page application, simulating the game, build with [Create React App](https://github.com/facebook/create-react-app) command with NPM.

The `_DATA.js` file in services represents a fake database. Original provided file was changed a bit, and now **data can be stored in cookies for persistence**.

## Structure

Below, the summary of the project structure, with relevant items.

```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # Application icon.
│   └── index.html # Single page app HTML.
└── src
│   ├── assets # Project images, avatars. etc.
│   ├── components # React components.
│   ├── services # JS async interfaces.
│   ├── store # Redux.
│   │   ├── actions # Actions.
│   │   │   └── shared.js # Common utils for actions.
│   │   ├── middleware # Middleware using Redux Saga.
│   │   │   ├── shared.js # Common utils for sagas.
│   │   │   └── logger.js # Saga for logging.
│   │   ├── reducers # Reducers.
│   │   │   └── defaults.js # Default values for partitions.
│   │   └── store.js # Initialize store with saga and reducers.
│   ├── styles # Stylesheets for components and pages.
│   ├── views # JSX for pages
│   │   └── layouts # Layouts for pages.
│   ├── App.jsx # Main component, used for routing and global cfg.
│   └── index.js # It is used for DOM rendering only.
└──.env-cmdrc.json # Environment config.
└──.eslintrc.json # Eslint configuration for JS/React/Redux.
└──.stylelintrc.json # Stylelint configuration for CSS/SCSS.
```

## Some considerations

I use some design patterns, for actions specially. I like **encapsulate the data** that I use in many parts of the code, so, each action is a object containing the **action types**, **action creator** and the **partition key**. Even some actions contains cache/cookies keys for ease the access.

The fake database provided (_DATA.js) was little bit modified for use environment variables, so, the **project may init with and without cookies persistence** logic.

I separate **simple components** from **page components**, in order to ease its use and improve project organization, like a MVC project.

I use **Redux Saga** instead of Redux Thunk, 'cause I think the way of manage **async operations** is the best, and saga provides all that I needed for this project.

Session is stored in cookies.

## Data

There are two types of objects stored in our database:

- Users
- Questions

### Users

Users include:

| Attribute | Type   | Description                                                                                                                                                                                                    |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The user’s unique identifier                                                                                                                                                                                   |
| name      | String | The user’s first name and last name                                                                                                                                                                            |
| avatarURL | String | The path to the image file                                                                                                                                                                                     |
| questions | Array  | A list of ids of the polling questions this user created                                                                                                                                                       |
| answers   | Object | The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options. |

### Questions

Questions include:

| Attribute | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| id        | String | The question’s unique identifier       |
| author    | String | The author’s unique identifier         |
| timestamp | String | The time when the question was created |
| optionOne | Object | The first voting option                |
| optionTwo | Object | The second voting option               |

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| votes     | Array  | A list that contains the id of each user who voted for that option |
| text      | String | The text of the option                                             |

Your code will talk to the database via 4 methods:

- `_getUsers()`
- `_getQuestions()`
- `_saveQuestion(question)`
- `_saveQuestionAnswer(object)`

1. `_getUsers()` Method

_Description_: Get all of the existing users from the database.
_Return Value_: Object where the key is the user’s id and the value is the user object.

2. `_getQuestions()` Method

_Description_: Get all of the existing questions from the database.
_Return Value_: Object where the key is the question’s id and the value is the question object.

3. `_saveQuestion(question)` Method

_Description_: Save the polling question in the database.
_Parameters_: Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute     | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| author        | String | The id of the user who posted the question |
| optionOneText | String | The text of the first option               |
| optionTwoText | String | The text of the second option              |

_Return Value_: An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type   | Description                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The id of the question that was posted                                                                                       |
| author    | String | The id of the user who posted the question                                                                                   |
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| timestamp | String | The time when the question was created                                                                                       |

4. `_saveQuestionAnswer(object)` Method

_Description_: Save the answer to a particular polling question in the database.
_Parameters_: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute  | Type   | Description                                                                             |
| ---------- | ------ | --------------------------------------------------------------------------------------- |
| authedUser | String | The id of the user who answered the question                                            |
| qid        | String | The id of the question that was answered                                                |
| answer     | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"` |

## Credits

Udacity: https://www.udacity.com/

Some Icons: https://www.flaticon.es/

Avatars: https://iconstore.co/redirect/?icon-pack=flatflow-icons

Not Found Page: https://colorlib.com/

Material Design Icons: https://dev.materialdesignicons.com/icons

Semantic UI React: https://react.semantic-ui.com/
