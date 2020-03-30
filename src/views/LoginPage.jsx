import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Header, Image, Message } from 'semantic-ui-react';
import { Logo } from '../assets/images';
import { SessionAction, UsersAction } from '../store/actions';
import '../styles/views/login.scss';

/**
 * Login page.
 *
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component
{
    state = {}

    /**
     * Dispatches fetch all action after component mounts.
     *
     * @memberof LoginPage
     */
    componentDidMount()
    {
        this.props.dispatch(UsersAction.Action(UsersAction.Types.FETCH_ALL));
    }

    /**
     * On submit selected user for login.
     *
     * @memberof LoginPage
     */
    onSignIn = () =>
    {
        const { history, session: { redirect, loading: sessionLoading } } = this.props;

        // Locks login attempts.
        if (sessionLoading)
        {
            return;
        }

        const id = this.state.userSelected;

        this.props.dispatch(SessionAction.Action(
            SessionAction.Types.LOGIN,
            {
                userId: id,
                redirect,
                history
            }
        ));
    }

    /**
     * Users container formatter.
     *
     * @param {any} users Users container.
     *
     * @returns {array} Users array.
     * @memberof LoginPage
     */
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

    /**
     * Intercepts dropdown changing.
     *
     * @param {any} e Event data.
     *
     * @return {func} Change handling func.
     * @memberof LoginPage
     */
    handleChange = (e, { value }) => this.setState({ userSelected: value })

    /**
     * Renders the login page.
     *
     * @returns {JSX} Login page.
     * @memberof LoginPage
     */
    render()
    {
        const { session: { loading: sessionLoading }, loading: usersLoading, error, users } = this.props;
        const noData = Object.keys(users).length === 0;
        // Message for dropdown in different component states.
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

LoginPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    users: PropTypes.objectOf(PropTypes.any)
};

function mapStateToProps({
    [SessionAction.Key]: session,
    [UsersAction.Key]: { loading, error, users = {} }
})
{
    return { session, users, loading, error };
}

export default connect(mapStateToProps)(LoginPage);
