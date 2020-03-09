import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ButtonGroup, Grid, Image, Label } from 'semantic-ui-react';
import { SessionAction } from './../store/actions';
import NavbarTab from './NavbarTab';

class Navbar extends React.Component
{
    onSignOut = async () =>
    {
        const { dispatch, history } = this.props;

        dispatch(SessionAction.Action(
            SessionAction.Types.LOGOUT
        ));

        // history.push('/main/login');
    }

    render()
    {
        const { user, location: { pathname } } = this.props;
        const isAuthenticated = user.authenticated;

        return (
            <>
                <Grid.Column width={ 4 } />
                <Grid.Column width={ 6 }>
                    <Grid padded centered>
                        <ButtonGroup className='navbar-menu' attached='top'>
                            <NavbarTab
                                icon='home'
                                help='Home'
                                to='/main'
                                path={ pathname }
                                disabled={ !isAuthenticated }
                            />
                            <NavbarTab
                                icon='question'
                                help='New Question'
                                to='/main/newquestion'
                                path={ pathname }
                                disabled={ !isAuthenticated }
                            />
                            <NavbarTab
                                icon='list alternate'
                                help='Leaderboard'
                                to='/main/leaderboard'
                                path={ pathname }
                                disabled={ !isAuthenticated }
                            />
                        </ButtonGroup>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={ 4 }>
                    <Grid>
                        <Grid.Column width={ 10 }>
                            {isAuthenticated && (
                                <Label className='navbar-user-info' image>
                                    <span><small>Hello,</small><br /><b>{ user.name }</b></span>
                                    <Image src={ user.avatarURL } />
                                </Label>
                            )}
                        </Grid.Column>
                        <Grid.Column width={ 2 }>
                            <NavbarTab
                                className={ `navbar-session${ isAuthenticated ? ' logout' : ' login' }` }
                                icon={ isAuthenticated ? 'sign out' : 'sign in' }
                                help={ isAuthenticated ? 'Logout' : 'Login' }
                                to={ isAuthenticated ? undefined : '/main/login' }
                                onClick={ isAuthenticated ? this.onSignOut : undefined }
                                path={ pathname }
                                style={ {
                                    width: '6vw',
                                    minWidth: '5em'
                                } }
                            />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </>
        );
    }
}

export default connect()(withRouter(Navbar));
