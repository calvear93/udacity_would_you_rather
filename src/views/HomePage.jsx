import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { HomeTab, QuestionsList } from '../components';
import { QuestionsMergeWithAuthorsOptionsAsArray } from '../utils/QuestionsFormatter';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';
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

        const data = QuestionsMergeWithAuthorsOptionsAsArray(session.id, options, questions, users);

        const answered = data
            .filter(q => q.answered);

        const unanswered = data
            .filter(q => !q.answered);

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
                            render: () => <QuestionsList questions={ unanswered } />
                        }),

                        HomeTab({
                            key: 'answered-tab',
                            title: 'Answered Questions',
                            color: 'green',
                            counter: answered.length,
                            loading,
                            render: () => <QuestionsList questions={ answered } />
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

export default connect(mapStateToProps)(HomePage);
