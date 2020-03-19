import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { HomeTab, QuestionsList } from '../components';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';
import { QuestionsMergeWithAuthors } from '../utils/QuestionsFormatter';
import '../styles/views/question-vote-page.scss';

class QuestionVotePage extends React.Component
{
    componentDidMount()
    {
        this.props.dispatch(QuestionsAction.Action(QuestionsAction.Types.GET_ALL));
    }

    render()
    {
        const { session, options, users = {}, questions = {}, loading, match: { params: { id } } } = this.props;

        const data = QuestionsMergeWithAuthors(session.id, options, questions, users);

        return (
            <div>test</div>
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

export default connect(mapStateToProps)(QuestionVotePage);
