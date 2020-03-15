import React from 'react';

class QuestionsList extends React.PureComponent
{
    state = {}

    render()
    {
        const { questions } = this.props;

        return (
            <>
                {
                    questions
                        .map(q => <label key={ q.id }>{q.id} </label>)
                }
            </>
        );
    }
}

export default QuestionsList;
