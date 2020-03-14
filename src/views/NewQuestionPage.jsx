import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import { Button, Card, Divider, Grid, Header } from 'semantic-ui-react';
import { ConfigurationAction, SessionAction } from '../store/actions';
import '../styles/views/new-question.scss';
import 'linqjs';

const QuestionInput = lazy(() => import('./../components/QuestionInput'));

class NewQuestionPage extends React.PureComponent
{
    constructor(props)
    {
        super(props);
        const { configuration: { options } } = this.props;
        this.state = options
            .reduce((result, item) =>
            {
                result[item] = {};

                return result;
            }, {});
    }

    componentDidMount()
    {
        this.props.dispatch(ConfigurationAction.Action(ConfigurationAction.Types.GET));
    }

    handleQuestionInputChange = (id, value, isValid) =>
    {
        this.setState({ [id]: { id, value, isValid } });
    };

    isValid = () => this.state && !Object.values(this.state).any(q => !q.isValid)

    onCreateQuestion = () =>
    {
        const { session } = this.props;

        const question = Object.keys(this.state)
            .reduce((result, key) =>
            {
                result[key] = {
                    votes: [],
                    text: this.state[key].value
                };

                return result;
            }, {});

        Object.assign(question, {
            id: uuid(),
            timestamp: Date.now(),
            author: session.id
        });

        console.log(question);
    }

    render()
    {
        const { configuration: { options, minInputLength } } = this.props;

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

                        {options
                            .map(o => (
                                <Grid.Row key={ o } centered>
                                    <QuestionInput
                                        id={ o }
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
    [ConfigurationAction.Key]: configuration
})
{
    return { session, configuration };
}

export default connect(mapStateToProps)(withRouter(NewQuestionPage));
