import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Input, Grid, Header, Divider, Label } from 'semantic-ui-react';
import { Logo } from '../assets/images';
import { SessionAction, UsersAction } from '../store/actions';
import '../styles/views/new-question.scss';
import 'linqjs';
import QuestionInput from './../components/QuestionInput';

const minInputLength = 3;

const options = [ 'optionOne', 'optionTwo' ];

class NewQuestionPage extends React.PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = options
            .reduce((result, item) =>
            {
                result[item] = {};

                return result;
            }, {});
    }

    handleQuestionInputChange = (id, value, isValid) =>
    {
        this.setState({ [id]: { value, isValid } });
    };

    isValid = () => !Object
        .values(this.state)
        .any(q => !q.isValid)

    render()
    {
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
                    >
                            Submit
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

export default NewQuestionPage;
