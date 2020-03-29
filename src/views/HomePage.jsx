import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { HomeTab, QuestionsList } from '../components';
import { QuestionsMergeWithAuthorsOptionsAsArray } from '../utils/QuestionsFormatter';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';
import '../styles/views/home.scss';

const messages = {
    answered: {
        button: 'View Stats',
        empty: {
            title: 'You haven\'t answered questions yet!',
            body: 'Try answer a question from Unanswered Questions tab in Home'
        }
    },
    unanswered: {
        button: 'View Pull',
        empty: {
            title: 'There are not questions to answer!',
            body: 'Try creating a new question from New Question tab'
        }
    }
};

const actions = {
    answered: {
        submit: (id, history) => history.push(`/summary/${ id }`)
    },
    unanswered: {
        submit: (id, history) => history.push(`/answer/${ id }`)
    }
};

class HomePage extends React.Component
{
    componentDidMount()
    {
        this.props.dispatch(QuestionsAction.Action(QuestionsAction.Types.GET_ALL));
    }

    render()
    {
        const { answered, unanswered, loading } = this.props;

        return (
            <Tab
                menu={ { pointing: true } }
                panes={
                    [
                        HomeTab({
                            key: 'unanswered-tab',
                            title: 'Unanswered Questions',
                            color: 'blue',
                            counter: unanswered.length,
                            loading,
                            render: () => (
                                <QuestionsList
                                    questions={ unanswered }
                                    messages={ messages.unanswered }
                                    actions={ actions.unanswered }
                                />
                            )
                        }),

                        HomeTab({
                            key: 'answered-tab',
                            title: 'Answered Questions',
                            color: 'green',
                            counter: answered.length,
                            loading,
                            render: () => (
                                <QuestionsList
                                    questions={ answered }
                                    messages={ messages.answered }
                                    actions={ actions.answered }
                                />
                            )
                        })
                    ]
                }
            />
        );
    }
}

function mapStateToProps({
    [ConfigurationAction.Key]: { options },
    [SessionAction.Key]: session,
    [UsersAction.Key]: { users = {} },
    [QuestionsAction.Key]: { questions = {}, loading }
})
{
    const data = QuestionsMergeWithAuthorsOptionsAsArray(session.id, options, questions, users, true);

    const answered = data
        .filter(q => q.answered);

    const unanswered = data
        .filter(q => !q.answered);

    return { session, answered, unanswered, loading };
}

export default connect(mapStateToProps)(HomePage);
