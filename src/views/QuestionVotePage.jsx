import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Grid, Header, Image, Form, Radio } from 'semantic-ui-react';
import { HomeTab, QuestionsList } from '../components';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';
import { QuestionMergeWithAuthorOptionsAsArray } from '../utils/QuestionsFormatter';
import '../styles/views/question-vote-page.scss';
import Loader from '../components/Loader';

class QuestionVotePage extends React.Component
{
    componentDidMount()
    {
        this.props.dispatch(QuestionsAction.Action(QuestionsAction.Types.GET_ALL));
    }

    render()
    {
        const {
            session,
            options,
            users = {},
            questions = {},
            loading,
            match: { params: { id } }
        } = this.props;

        const question = QuestionMergeWithAuthorOptionsAsArray(
            id,
            session.id,
            options,
            questions,
            users
        );

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
                                                                        value='this'
                                                                        // checked={ this.state.value === 'this' }
                                                                        // onChange={ this.handleChange }
                                                                    />
                                                                </Form.Field>
                                                            ))
                                                    }
                                                </Form>
                                            </Grid.Row>

                                            <Grid.Row className='question-view-pull-container'>
                                                <Button
                                                    color='teal'
                                                    onClick={ this.onViewPull }
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

function mapStateToProps({
    [ConfigurationAction.Key]: { options },
    [SessionAction.Key]: session,
    [UsersAction.Key]: { users },
    [QuestionsAction.Key]: { questions, loading }
})
{
    return { session, options, users, questions, loading };
}

export default connect(mapStateToProps)(QuestionVotePage);
