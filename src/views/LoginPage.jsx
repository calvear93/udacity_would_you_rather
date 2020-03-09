import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Header, Image } from 'semantic-ui-react';
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

    onSignIn = async () =>
    {
        const id = this.state.userSelected;

        this.props.dispatch(SessionAction.Action(
            SessionAction.Types.LOGIN,
            {
                userId: id
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
        const { users } = this.props;

        return (
            <>
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
                        <Dropdown
                            className='login-user-selector'
                            placeholder='Select User'
                            closeOnEscape
                            fluid
                            selection
                            defaultValue={ this.userSelected }
                            onChange={ this.handleChange }
                            options={ this.formatUsers(users) }
                        />
                        <Button
                            className='login-sign-in'
                            fluid
                            color='teal'
                            disabled={ this.state.userSelected ? false : true }
                            onClick={ this.onSignIn }
                        >
                            Sign in
                        </Button>
                    </Card.Content>
                </Card>
            </>
        );
    }
}

function mapStateToProps({ [UsersAction.Key]: { users = {} } })
{
    return { users };
}

export default connect(mapStateToProps)(LoginPage);
