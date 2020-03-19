import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { HomeTab, QuestionsList } from '../components';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';
import '../styles/views/question-vote-page.scss';

class QuestionVotePage extends React.Component
{
    componentDidMount()
    {
        // this.props.dispatch(QuestionsAction.Action(QuestionsAction.Types.GET_ALL));
    }

    render()
    {
        const { session, users = {}, questions = {}, loading } = this.props;

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

export default connect(mapStateToProps)(withRouter(QuestionVotePage));
