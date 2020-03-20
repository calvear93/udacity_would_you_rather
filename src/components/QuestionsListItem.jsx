import 'linqjs';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, Grid, Header, Image, MessageList } from 'semantic-ui-react';
import '../styles/components/questions-list-item.scss';

class QuestionsListItem extends React.PureComponent
{
    onSubmit = () =>
    {
        const { question, history, submit } = this.props;

        submit(question.id, history);
    }

    render()
    {
        const { question, buttonText } = this.props;

        const firstOption = question.options.first();

        return (
            <Card centered fluid>
                <Card.Content className='question-header'>
                    <Header className='question-title' as='h3'>{question.author.name} asks:</Header>
                </Card.Content>

                <Card.Content>
                    <Grid className='question-container'>
                        <Grid.Column className='question-avatar-container' width={ 4 }>
                            <Image className='question-avatar' src={ question.author.avatarURL } />
                        </Grid.Column>

                        <Grid.Column className='question-info-container' width={ 10 }>
                            <Grid stackable>
                                <Grid.Row className='question-title'>
                                    <Header as='h4'>Would you rather</Header>
                                </Grid.Row>

                                <Grid.Row>
                                    <Header as='h5' className='question-text'>...{firstOption.text}...</Header>
                                </Grid.Row>

                                <Grid.Row className='question-view-pull-container'>
                                    <Button
                                        basic
                                        color='teal'
                                        onClick={ this.onSubmit }
                                    >
                                        {buttonText}
                                    </Button>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default withRouter(QuestionsListItem);
