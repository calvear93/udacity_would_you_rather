import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Dropdown, Grid, Header, Image, Message } from 'semantic-ui-react';
import { Logo } from '../assets/images';
import { SessionAction, UsersAction } from '../store/actions';
import '../styles/views/login.scss';

class LoginPage extends React.Component
{
    state = {
        userSelected: undefined
    }

    componentDidMount()
    {
        this.props.dispatch(UsersAction.Action(UsersAction.Types.GET_ALL));
    }

    onSignIn = () =>
    {
        const { history } = this.props;
        const id = this.state.userSelected;

        this.props.dispatch(SessionAction.Action(
            SessionAction.Types.LOGIN,
            {
                userId: id,
                history
            }
        ));
    }

    formatUsers = (users) =>
    {
        return Object.entries(users)
            .map(u =>
            {
                const user = u[1];

                return {
                    key: user.id,
                    text: user.name,
                    value: user.id,
                    image: { avatar: true, src: user.avatarURL }
                };
            });
    }

    handleChange = (e, { value }) => this.setState({ userSelected: value })

    render()
    {
        const { session: { loading: sessionLoading }, loading: usersLoading, error, users } = this.props;
        const noData = Object.keys(users).length === 0;
        const placeholder = noData ?
            usersLoading ?
                'Fetching data...'
                : 'No data fetched'
            : 'Select User';

        return (
            <Card centered fluid>
                <Card.Content className='login-header'>
                    <Header className='login-title centered' as='h2'>Welcome to the Would You Rather App!</Header>
                    <Header className='login-subtitle centered' as='h4'>Please sign in to continue</Header>
                </Card.Content>

                <Card.Content>
                    <Grid centered padded>
                        <Image src={ Logo } size='small' />
                    </Grid>
                    <Header className='login-sign-in-info centered' as='h1'>Sign in</Header>
                </Card.Content>

                <Card.Content extra>
                    {!usersLoading && noData && error && (
                        <Message
                            error
                            header={ error.message }
                            list={ [
                                error.error,
                                'You must validate your internet connection.',
                                'Refresh the page for retry.'
                            ] }
                        />
                    )}

                    <Dropdown
                        fluid
                        className='login-user-selector'
                        placeholder={ placeholder }
                        closeOnEscape
                        selection
                        defaultValue={ this.userSelected }
                        onChange={ this.handleChange }
                        options={ this.formatUsers(users) }
                        disabled={ noData }
                        loading={ usersLoading }
                    />
                    <Button
                        fluid
                        className='login-sign-in'
                        color='teal'
                        disabled={ !this.state.userSelected }
                        onClick={ this.onSignIn }
                        loading={ sessionLoading }
                    >
                            Sign in
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

function mapStateToProps({
    [SessionAction.Key]: session,
    [UsersAction.Key]: { loading, error, users = {} }
})
{
    return { session, users, loading, error };
}

export default connect(mapStateToProps)(withRouter(LoginPage));
