import 'linqjs';
import React from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Header, Image, Label, Progress } from 'semantic-ui-react';
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

        return (
            <Card centered fluid>
                {!users || loading ?
                    (
                        <Loader className='content-loader' message='Loading Content' />
                    ) : (
                        <>
                            <Card>
                                {users.map((u) => <label key={ u.id }>{u.name}</label>)}
                            </Card>
                        </>
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
            .orderByDescending((u) => u.score);

        // Assigns awards for first places.
        users.forEach((u, i) => u.award = awards[i]);
    }

    return { users, loading };
}

export default connect(mapStateToProps)(LeaderBoardPage);

