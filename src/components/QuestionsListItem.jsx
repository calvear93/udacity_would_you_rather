import React from 'react';
import { Button, Card, Grid, Header, Image } from 'semantic-ui-react';
import '../styles/components/questions-list-item.scss';

class QuestionsListItem extends React.PureComponent
{
    render()
    {
        const { question } = this.props;

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
                            <Grid>
                                <Grid.Row className='question-title'>
                                    <Header as='h4'>Would you rather</Header>
                                </Grid.Row>

                                <Grid.Row>
                                    <Header as='h5' className='question-text'>...{question.optionOne.text}...</Header>
                                </Grid.Row>

                                <Grid.Row className='question-view-pull-container'>
                                    <Button basic color='teal'>
                                        View Pull
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

export default QuestionsListItem;
