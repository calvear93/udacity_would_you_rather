import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Header, Message, Image, Statistic, Label, Progress, Divider } from 'semantic-ui-react';
import Loader from '../components/Loader';
import '../styles/views/leaderboard.scss';
import { ConfigurationAction, QuestionsAction, SessionAction, UsersAction } from '../store/actions';

const awards = [ 'gold', 'silver', 'bronze' ];

class LeaderBoardPage extends React.Component
{
    componentDidMount()
    {
        this.props.dispatch(UsersAction.Action(UsersAction.Types.GET_ALL));
    }

    render()
    {
        const { users, loading } = this.props;
        console.log(users);

        return (
            <Card className='board-container' centered fluid>
                {!users || loading ?
                    (
                        <Loader className='content-loader' message='Loading Content' />
                    ) : (
                        users
                            .map(user => (
                                <Card key={ user.id } className={ user.award } centered fluid>
                                    {user.award && (
                                        <a className='ui left corner label award'>
                                            <i aria-hidden='true' className={ `winner icon ${ user.award }` } />
                                        </a>
                                    )}
                                    <Card.Content>
                                        <Grid className='board-container'>
                                            <Grid.Column className='board-avatar-container' width={ 3 }>
                                                <Image className='board-avatar' src={ user.avatarURL } />
                                            </Grid.Column>

                                            <Grid.Column className='board-info-container' width={ 6 }>
                                                <Grid stackable>
                                                    <Grid.Row className='board-title' centered>
                                                        <Header as='h2'>{user.name}</Header>
                                                    </Grid.Row>
                                                    <Grid.Row centered>
                                                        <Statistic
                                                            size='tiny'
                                                            color={ user.answers === 0 ? 'red' : 'teal' }
                                                        >
                                                            <Statistic.Value>{user.answers}</Statistic.Value>
                                                            <Statistic.Label>Answered questions</Statistic.Label>
                                                        </Statistic>
                                                    </Grid.Row>
                                                    <Grid.Row centered>
                                                        <Statistic
                                                            size='tiny'
                                                            color={ user.questions === 0 ? 'red' : 'teal' }
                                                        >
                                                            <Statistic.Value>{user.questions}</Statistic.Value>
                                                            <Statistic.Label>Created questions</Statistic.Label>
                                                        </Statistic>
                                                    </Grid.Row>
                                                </Grid>
                                            </Grid.Column>

                                            <Grid.Column className='board-info-container' width={ 4 }>
                                                <Grid stackable>
                                                    {user.score}
                                                </Grid>
                                            </Grid.Column>
                                        </Grid>
                                    </Card.Content>
                                </Card>
                            ))
                    )
                }
            </Card>
        );
    }
}

function mapStateToProps({
    [UsersAction.Key]: { users, loading }
})
{
    if (users)
    {
        // Builds user stats.
        users = Object.keys(users)
            .reduce((acc, key) =>
            {
                let user = users[key];
                const answers = Object.keys(user.answers);
                acc.push({
                    ...user,
                    answers: answers.length,
                    questions: user.questions.length,
                    score: answers.length + user.questions.length
                });

                return acc;
            }, [])
            .sort((a, b) => b.score > a.score ? 1 : -1);

        // Assigns awards for first places.
        users.forEach((u, i) => u.award = awards[i]);
    }

    return { users, loading };
}

export default connect(mapStateToProps)(LeaderBoardPage);

