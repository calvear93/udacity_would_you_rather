import React from 'react';
import QuestionsListItem from './QuestionsListItem';
import { Message } from 'semantic-ui-react';

class QuestionsList extends React.PureComponent
{
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

export default QuestionsList;
