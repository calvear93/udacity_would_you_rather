import PropTypes from 'prop-types';
import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Header, Image, Label, Progress } from 'semantic-ui-react';
import Loader from '../components/Loader';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';
import '../styles/views/question-summary-page.scss';
import { QuestionMergeWithAuthorOptionsAsArray } from '../utils/QuestionsFormatter';

// Calcs percentage of a number.
const calcPercentage = (q, t) =>
{
    return ((q / t) * 100).toFixed(2);
};

/**
 * Question summary page.
 *
 * @class QuestionSummaryPage
 * @extends {React.Component}
 */
class QuestionSummaryPage extends React.Component
{
    /**
     * Gets all question after component mounts.
     *
     * @memberof QuestionSummaryPage
     */
    componentDidMount()
    {
        this.props.dispatch(QuestionsAction.Action(QuestionsAction.Types.GET_ALL));
    }

    /**
     * Renders the summary page.
     *
     * @returns {JSX} Summary page.
     * @memberof QuestionSummaryPage
     */
    render()
    {
        const { question, loading } = this.props;

        return (
            <Card centered fluid>
                {!question || loading ?
                    (
                        <Loader className='content-loader' message='Loading Content' />
                    ) : (
                        <>
                            <Card.Content className='question-header'>
                                <Header className='question-title' as='h3'>Asked by {question.author.name}</Header>
                            </Card.Content>

                            <Card.Content>
                                <Grid className='question-container'>
                                    <Grid.Column className='question-avatar-container' width={ 4 }>
                                        <Image className='question-avatar' src={ question.author.avatarURL } />
                                    </Grid.Column>

                                    <Grid.Column className='question-info-container' width={ 10 }>
                                        <Grid>
                                            <Grid.Row className='summary-title'>
                                                <Header as='h2'>Results:</Header>
                                            </Grid.Row>

                                            <Grid.Row>
                                                {
                                                    question.options
                                                        .map(o => (
                                                            <Card
                                                                key={ o.id }
                                                                className={ `summary-question${ o.answered ? ' answered' : '' }` }
                                                                fluid
                                                                centered
                                                            >
                                                                {o.answered && (
                                                                    <Label key={ o.id }
                                                                        className='question-indicator'
                                                                        color={ 'yellow' }
                                                                        floating
                                                                    >
                                                                    Your Vote
                                                                    </Label>
                                                                )}
                                                                <Card.Content className='summary-question-title'>
                                                                    <Card.Header><small>Would you rather</small> {o.text}</Card.Header>
                                                                </Card.Content>

                                                                <Card.Content>
                                                                    <Progress
                                                                        percent={ calcPercentage(o.votes.length, question.total) }
                                                                        color='teal'
                                                                        size='large'
                                                                        progress
                                                                        indicating={ o.votes.length !== question.total }
                                                                    >
                                                                        {o.votes.length} of {question.total} votes
                                                                    </Progress>
                                                                </Card.Content>
                                                            </Card>
                                                        ))
                                                }
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>
                                </Grid>
                            </Card.Content>
                        </>
                    )
                }
            </Card>
        );
    }
}

QuestionSummaryPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    question: PropTypes.objectOf(PropTypes.any)
};

function mapStateToProps({
    [ConfigurationAction.Key]: { options },
    [SessionAction.Key]: session,
    [UsersAction.Key]: { users = {} },
    [QuestionsAction.Key]: { questions = {}, loading }
}, {
    match: { params: { id } }
})
{
    const question = QuestionMergeWithAuthorOptionsAsArray(
        id,
        session.id,
        options,
        questions,
        users
    );

    return { id, session, question, loading };
}

export default connect(mapStateToProps)(QuestionSummaryPage);

