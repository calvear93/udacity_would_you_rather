import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Input, Grid, Header, Divider, Label } from 'semantic-ui-react';
import { Logo } from '../assets/images';
import { SessionAction, UsersAction } from '../store/actions';
import '../styles/views/new-question.scss';

const minInputLength = 5;

class NewQuestionPage extends React.PureComponent
{
    state = {
        'question-one': '',
        'question-two': ''
    }

    handleInputChange = (event) =>
    {
        const id = event.target.getAttribute('id');

        this.setState({ [id]: event.target.value });
    };

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

                        <Grid.Row centered>
                            <Input
                                id='question-one'
                                className='question-input'
                                label={ { icon: 'question circle' } }
                                labelPosition='right corner'
                                placeholder='Enter Option One Text Here'
                                onChange={ this.handleInputChange }
                                required
                            />
                            {this.state['question-one'].length < minInputLength && (
                                <Label pointing>Please enter a value of min {minInputLength} chars</Label>
                            )}
                        </Grid.Row>

                        <Divider horizontal>
                            <Header as='h4'>OR</Header>
                        </Divider>

                        <Grid.Row centered>
                            <Input
                                id='question-two'
                                className='question-input'
                                label={ { icon: 'question circle' } }
                                labelPosition='right corner'
                                placeholder='Enter Option Two Text Here'
                                onChange={ this.handleInputChange }
                                required
                            />
                            {this.state['question-two'].length < minInputLength && (
                                <Label pointing>Please enter a value of min {minInputLength} chars</Label>
                            )}
                        </Grid.Row>
                    </Grid>
                </Card.Content>

                <Card.Content extra>
                    <Button
                        fluid
                        className='question-submit'
                        color='teal'
                        disabled={
                            this.state['question-one'].length >= minInputLength &&
                            this.state['question-two'].length >= minInputLength
                                ? false : true
                        }
                    >
                            Submit
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

export default NewQuestionPage;
