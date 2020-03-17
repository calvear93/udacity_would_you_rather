import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'linqjs';
import { HomeTab, QuestionsList } from '../components';
import { QuestionsAction, UsersAction, SessionAction, ConfigurationAction } from '../store/actions';
import { Tab, LoaderasLoading } from 'semantic-ui-react';
import '../styles/views/home.scss';

class HomePage extends React.Component
{
    componentDidMount()
    {
        this.props.dispatch(QuestionsAction.Action(QuestionsAction.Types.GET_ALL));
    }

    render()
    {
        const { session, options, users = {}, questions = {}, loading } = this.props;

        const data = Object.values(questions)
            .map(q => (
                {
                    id: q.id,
                    author: users[q.author],
                    ...Object.keys(q)
                        .filter(k => options.includes(k))
                        .reduce((accumulator, k) =>
                        {
                            accumulator[k] = q[k];
                            // Validates if the question was answered for current user.
                            accumulator.answered = accumulator.answered ?
                                accumulator.answered
                                : q[k].votes.any(v => v === session.id);

                            return accumulator;
                        }, {})
                }
            ));

        const answered = data
            .filter(q => q.answered);

        const unanswered = data
            .filter(q => !q.answered);

        return (
            <Tab panes={
                [
                    HomeTab({
                        key: 'unanswered-tab',
                        title: 'Unanswered Questions',
                        color: 'blue',
                        counter: unanswered.length,
                        loading,
                        render: () => <QuestionsList questions={ unanswered } loading={ loading } />
                    }),
                    HomeTab({
                        key: 'answered-tab',
                        title: 'Answered Questions',
                        color: 'green',
                        counter: answered.length,
                        loading,
                        render: () => <QuestionsList questions={ answered } loading={ loading } />
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
    [UsersAction.Key]: { users },
    [QuestionsAction.Key]: { questions, loading }
})
{
    return { session, options, users, questions, loading };
}

export default connect(mapStateToProps)(withRouter(HomePage));
