import 'linqjs';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Header, Image, Label, Statistic } from 'semantic-ui-react';
import Loader from '../components/Loader';
import { UsersAction } from '../store/actions';
import '../styles/views/leaderboard.scss';

// Awards for first places in the game.
const awards = [ 'gold', 'silver', 'bronze' ];

/**
 * Leaderboard page.
 *
 * @class LeaderBoardPage
 * @extends {React.Component}
 */
class LeaderBoardPage extends React.Component
{
    /**
     * Dispatches a Get All action after component mounts.
     *
     * @memberof LeaderBoardPage
     */
    componentDidMount()
    {
        this.props.dispatch(UsersAction.Action(UsersAction.Types.GET_ALL));
    }

    /**
     * Renders the Leaderboard page.
     *
     * @returns {JSX} Leaderboard.
     * @memberof LeaderBoardPage
     */
    render()
    {
        const { users, loading } = this.props;

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
                                            <Grid.Column className='board-avatar-container' width={ 4 }>
                                                <Image className='board-avatar' src={ user.avatarURL } />
                                            </Grid.Column>

                                            <Grid.Column className='board-info-container' width={ 7 }>
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

                                            <Grid.Column className='board-info-score' width={ 4 }>
                                                <Grid stackable>
                                                    <Card>
                                                        <Card.Content className='score-title'>
                                                            <Header as='h2' className='centered'>Score</Header>
                                                        </Card.Content>
                                                        <Card.Content className='score-value'>
                                                            <Label circular color={ user.questions === 0 ? 'red' : 'teal' }>
                                                                {user.score}
                                                            </Label>
                                                        </Card.Content>
                                                    </Card>
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

LeaderBoardPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.any)
};

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

