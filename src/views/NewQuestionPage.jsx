import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Divider, Grid, Header } from 'semantic-ui-react';
import { QuestionsAction, ConfigurationAction, SessionAction } from '../store/actions';
import '../styles/views/new-question.scss';
import 'linqjs';

// Lazy loading components.
const QuestionInput = lazy(() => import('./../components/QuestionInput'));

class NewQuestionPage extends React.PureComponent
{
    componentDidMount()
    {
        this.props.dispatch(ConfigurationAction.Action(
            ConfigurationAction.Types.GET
        ));
    }

    handleQuestionInputChange = (id, value, isValid) =>
    {
        this.props.dispatch(QuestionsAction.Action(
            QuestionsAction.Types.SAVE_INPUT,
            { id, value, isValid }
        ));
    };

    isValid = () =>
    {
        return !this.props.inputs.any(q => !q.isValid);
    }

    onCreateQuestion = () =>
    {
        const { session, history, loading } = this.props;

        if (loading)
        {
            return;
        }

        const question = this.props.inputs
            .reduce((result, input) =>
            {
                result[input.id] = {
                    votes: [],
                    text: input.value
                };

                return result;
            }, {});

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
                                        onChange={ this.handleQuestionInputChange }
                                        placeholder='Enter Option Text Here'
                                        minInputLength={ minInputLength }
                                    />
                                </Grid.Row>
                            ))
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

function mapStateToProps({
    [SessionAction.Key]: session,
    [ConfigurationAction.Key]: { minInputLength },
    [QuestionsAction.Key]: { inputs: storedInputs, loading }
})
{
    const inputs = Object.values(storedInputs);

    return { session, minInputLength, inputs, loading };
}

export default connect(mapStateToProps)(withRouter(NewQuestionPage));
