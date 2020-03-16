import React from 'react';

class QuestionsList extends React.PureComponent
{
    state = {}

    render()
    {
        const { questions, loading } = this.props;

        return (
            <>
                {
                    !loading && questions
                        .map(q => <label key={ q.id }>{q.id} </label>)
                }
            </>
        );
    }
}

export default QuestionsList;
