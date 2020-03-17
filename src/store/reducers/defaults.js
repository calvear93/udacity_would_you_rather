const ConfigurationDefaults = {
    minInputLength: 3,
    options: [ 'optionOne', 'optionTwo' ]
};

const QuestionDefaults = {
    inputs: ConfigurationDefaults.options
        .reduce((result, key) =>
        {
            result[key] = { id: key };

            return result;
        }, {})
};

const SessionDefaults = {
    authenticated: false
};

const UsersDefaults = {};

export {
    ConfigurationDefaults,
    SessionDefaults,
    QuestionDefaults,
    UsersDefaults
};
