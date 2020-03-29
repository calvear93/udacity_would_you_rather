import 'linqjs';
import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Divider, Grid, Header } from 'semantic-ui-react';
import { ConfigurationAction, QuestionsAction, SessionAction } from '../store/actions';
import '../styles/views/new-question.scss';

// Lazy loading components.
const QuestionInput = lazy(() => import('./../components/QuestionInput'));

/**
 * New Question page.
 *
 * @class NewQuestionPage
 * @extends {React.PureComponent}
 */
class NewQuestionPage extends React.PureComponent
{
    /**
     * Gets configuration after components mounts.
     *
     * @date 2020-03-29
     * @memberof NewQuestionPage
     */
    componentDidMount()
    {
        this.props.dispatch(ConfigurationAction.Action(
            ConfigurationAction.Types.GET
        ));
    }

    /**
     * Handles question input change.
     *
     * @param {string} id Input Id.
     * @param {string} value Input value.
     * @param {bool} isValid Whether is valid.
     *
     * @memberof NewQuestionPage
     */
    handleQuestionInputChange = (id, value, isValid) =>
    {
        this.props.dispatch(QuestionsAction.Action(
            QuestionsAction.Types.SAVE_INPUT,
            { id, value, isValid }
        ));
    };

    /**
     * Validates input.
     *
     * @return {bool} Input validation.
     *
     * @memberof NewQuestionPage
     */
    isValid = () =>
    {
        return !this.props.inputs.any(q => !q.isValid);
    }

    /**
     * Dispatches the creation of a question.
     *
     * @memberof NewQuestionPage
     */
    onCreateQuestion = () =>
    {
        const { session, history, loading } = this.props;

        if (loading)
        {
            return;
        }
        // Question format.
        const question = this.props.inputs
            .reduce((result, input) =>
            {
                result[input.id] = {
                    votes: [],
                    text: input.value
                };

                return result;
            }, {});
        // Adds local timestamp and author.
        Object.assign(question, {
            timestamp: Date.now(),
            author: session.id
        });

        this.props.dispatch(QuestionsAction.Action(
            QuestionsAction.Types.CREATE,
            {
                question,
                history
            }
        ));
    }

    /**
     * Renders the new question page.
     *
     * @returns {JSX} New question.
     * @memberof NewQuestionPage
     */
    render()
    {
        const { minInputLength, inputs, loading } = this.props;

        return (
            <Card centered fluid>
                <Card.Content className='question-header'>
                    <Header className='centered' as='h2'>Create New Question</Header>
                </Card.Content>

                <Card.Content>
                    <Grid padded>
                        <Grid.Row>
                            <Header as='h5'>Complete the question:</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h3'>Would you rather...</Header>
                        </Grid.Row>

                        {inputs
                            .map(i => (
                                <Grid.Row key={ i.id } centered>
                                    <QuestionInput
                                        id={ i.id }
                                        value={ i.value }
                                        onChange={ this.handleQuestionInputChange }
                                        placeholder='Enter Option Text Here'
                                        minInputLength={ minInputLength }
                                    />
                                </Grid.Row>
                            ))
                            // Renders a divider between each element.
                            .reduce((prev, curr, index) => [
                                prev,
                                <Divider key={ `divider-${ index }` } horizontal>
                                    <Header as='h4'>OR</Header>
                                </Divider>,
                                curr
                            ])
                        }
                    </Grid>
                </Card.Content>

                <Card.Content extra>
                    <Button
                        fluid
                        className='question-submit'
                        color='teal'
                        disabled={ !this.isValid() }
                        onClick={ this.onCreateQuestion }
                        loading={ loading }
                    >
                            Submit
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

NewQuestionPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    inputs: PropTypes.arrayOf(PropTypes.any),
    loading: PropTypes.bool,
    minInputLength: PropTypes.number.isRequired,
    session: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({
    [SessionAction.Key]: session,
    [ConfigurationAction.Key]: { minInputLength },
    [QuestionsAction.Key]: { inputs: storedInputs, loading }
})
{
    const inputs = Object.values(storedInputs);

    return { session, minInputLength, inputs, loading };
}

export default connect(mapStateToProps)(NewQuestionPage);
