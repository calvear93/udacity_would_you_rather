import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ButtonGroup, Grid, Image, Label } from 'semantic-ui-react';
import { SessionAction } from './../store/actions';
import NavbarTab from './NavbarTab';

/**
 * Navbar with tabs and user info.
 *
 * @class Navbar
 * @extends {React.Component}
 */
class Navbar extends React.Component
{
    /**
     * Triggered when user press sign out button.
     *
     * @memberof Navbar
     */
    onSignOut = async () =>
    {
        const { dispatch, history } = this.props;

        dispatch(SessionAction.Action(
            SessionAction.Types.LOGOUT,
            { history }
        ));
    }

    /**
     * Renders the component.
     *
     * @returns {JSX} The navbar.
     * @memberof Navbar
     */
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
                                to='/add'
                                path={ pathname }
                                disabled={ !isAuthenticated }
                            />

                            <NavbarTab
                                icon='list alternate'
                                help='Leaderboard'
                                to='/leaderboard'
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
                                    <span><small className=''>Hello,</small><br /><b>{ user.name }</b></span>
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

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect()(withRouter(Navbar));
