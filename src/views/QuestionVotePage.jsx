import 'linqjs';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Grid, Header, Image, Radio } from 'semantic-ui-react';
import Loader from '../components/Loader';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';
import '../styles/views/question-vote-page.scss';
import { QuestionMergeWithAuthorOptionsAsArray } from '../utils/QuestionsFormatter';
import { Dialog } from '../utils/Swal';

/**
 * Question voting page.
 *
 * @class QuestionVotePage
 * @extends {React.Component}
 */
class QuestionVotePage extends React.Component
{
    state = {}

    /**
     * Gets all question after component mounts.
     *
     * @memberof QuestionVotePage
     */
    componentDidMount()
    {
        this.props.dispatch(QuestionsAction.Action(QuestionsAction.Types.GET_ALL));
    }

    /**
     * Handles the radio value changing.
     *
     * @param {any} e Changing event.
     *
     * @returns {func} Handling func.
     * @memberof QuestionVotePage
     */
    handleChange = (e, { value }) => this.setState({ value })

    /**
     * Voting submit.
     *
     * @memberof QuestionVotePage
     */
    onSubmit = () =>
    {
        const {
            id,
            history,
            session: { id: author }
        } = this.props;

        Dialog('question', '¿Are you sure to submit your answer?')
            .then((result) =>
            {
                if (result.dismiss)
                {
                    return;
                }

                this.props.dispatch(QuestionsAction.Action(
                    QuestionsAction.Types.ANSWER,
                    {
                        history,
                        answer: {
                            qid: id,
                            authedUser: author,
                            answer: this.state.value
                        }
                    }
                ));
            });
    }

    /**
     * Renders the question vote page.
     *
     * @returns {JSX} Question vote page.
     * @memberof QuestionVotePage
     */
    render()
    {
        const {
            question,
            loading
        } = this.props;

        return (
            <Card centered fluid>
                {!question || loading ?
                    (
                        <Loader className='content-loader' message='Loading Content' />
                    ) : (
                        <>
                            <Card.Content className='question-header'>
                                <Header className='question-title' as='h3'>{question.author.name} asks:</Header>
                            </Card.Content>

                            <Card.Content>
                                <Grid className='question-container'>
                                    <Grid.Column className='question-avatar-container' width={ 4 }>
                                        <Image className='question-avatar' src={ question.author.avatarURL } />
                                    </Grid.Column>

                                    <Grid.Column className='question-info-container' width={ 10 }>
                                        <Grid>
                                            <Grid.Row className='question-title'>
                                                <Header as='h3'>Would you rather...</Header>
                                            </Grid.Row>

                                            <Grid.Row>
                                                <Form>
                                                    {
                                                        question.options
                                                            .map(o => (
                                                                <Form.Field key={ o.id }>
                                                                    <Radio
                                                                        label={ o.text }
                                                                        name='options'
                                                                        value={ o.id }
                                                                        checked={ this.state.value === o.id }
                                                                        onChange={ this.handleChange }
                                                                    />
                                                                </Form.Field>
                                                            ))
                                                    }
                                                </Form>
                                            </Grid.Row>

                                            <Grid.Row className='question-view-pull-container'>
                                                <Button
                                                    color='teal'
                                                    onClick={ this.onSubmit }
                                                    disabled={ !this.state.value }
                                                >
                                                    Submit
                                                </Button>
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

QuestionVotePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    id: PropTypes.string.isRequired,
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

export default connect(mapStateToProps)(QuestionVotePage);
