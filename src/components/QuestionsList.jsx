import PropTypes from 'prop-types';
import React from 'react';
import { Message } from 'semantic-ui-react';
import QuestionsListItem from './QuestionsListItem';

/**
 * Renders the list of questions in Home page.
 *
 * @class QuestionsList
 * @extends {React.PureComponent}
 */
class QuestionsList extends React.PureComponent
{
    /**
     * Renders the components.
     *
     * @returns {JSX} Questions list.
     * @memberof QuestionsList
     */
    render()
    {
        const { questions, actions, messages } = this.props;

        return (
            <>
                {questions.length > 0
                    ?
                    questions
                        .map(q => (
                            <QuestionsListItem
                                key={ q.id }
                                question={ q }
                                buttonText={ messages.button }
                                submit={ actions.submit }
                            />
                        ))
                    :
                    // When no questions.
                    <Message
                        warning
                        icon='warning'
                        header={ messages.empty.title }
                        content={ messages.empty.body }
                    />
                }
            </>
        );
    }
}

QuestionsList.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    messages: PropTypes.objectOf(PropTypes.any),
    questions: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default QuestionsList;
