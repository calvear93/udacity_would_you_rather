import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Image, Button, Header, Form, Radio } from 'semantic-ui-react';
import Loader from '../components/Loader';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';
import '../styles/views/question-summary-page.scss';
import { QuestionMergeWithAuthorOptionsAsArray } from '../utils/QuestionsFormatter';

class QuestionSummaryPage extends React.Component
{
    componentDidMount()
    {
        this.props.dispatch(QuestionsAction.Action(QuestionsAction.Types.GET_ALL));
    }

    render()
    {
        const { question, loading } = this.props;
        console.log(question);

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
                                                {
                                                    question.options
                                                        .map(o => (
                                                            <label key={ o.id }>{o.text}</label>
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

