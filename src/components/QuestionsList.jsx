import React from 'react';
import QuestionsListItem from './QuestionsListItem';

class QuestionsList extends React.PureComponent
{
    render()
    {
        const { questions } = this.props;

        return (
            <>
                {
                    questions
                        .map(q => <QuestionsListItem key={ q.id } question={ q } />)
                }
            </>
        );
    }
}

export default QuestionsList;
