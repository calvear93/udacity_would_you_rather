import React from 'react';
import QuestionsListItem from './QuestionsListItem';
import { Message } from 'semantic-ui-react';

class QuestionsList extends React.PureComponent
{
    render()
    {
        const { questions } = this.props;

        return (
            <>
                {questions.length > 0
                    ?
                    questions.map(q => <QuestionsListItem key={ q.id } question={ q } />)
                    :
                    <Message
                        warning
                        icon='warning'
                        header='No questions in this section!'
                        content='Try adding a new question or answering any.'
                    />
                }
            </>
        );
    }
}

export default QuestionsList;
