import Cookies from 'js-cookie';
import { SessionAction } from '../actions';

const ConfigurationDefaults = {
    minInputLength: 3,
    options: [ 'optionOne', 'optionTwo' ]
};

const QuestionDefaults = {
    inputs: ConfigurationDefaults.options
        .reduce((result, key) =>
        {
            result[key] = {
                id: key,
                value: '',
                isValid: false
            };

            return result;
        }, {})
};

const SESSION = Cookies.get(SessionAction.CookiesKeys.SESSION);

const SessionDefaults = (SESSION && JSON.parse(SESSION)) || {
    authenticated: false
};

const UsersDefaults = {};

export {
    ConfigurationDefaults,
    SessionDefaults,
    QuestionDefaults,
    UsersDefaults
};
