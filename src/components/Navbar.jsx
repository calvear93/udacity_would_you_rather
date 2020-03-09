import React from 'react';
import { withRouter } from 'react-router-dom';
import { ButtonGroup, Grid, Image, Label } from 'semantic-ui-react';
import NavbarTab from './NavbarTab';

class Navbar extends React.Component
{
    render()
    {
        const { user, location: { pathname } } = this.props;

        return (
            <>
                <Grid.Column width={ 4 } />
                <Grid.Column width={ 6 }>
                    <Grid padded centered>
                        <ButtonGroup className='navbar-menu' attached='top'>
                            <NavbarTab icon='home' help='Home' to='/main' path={ pathname } />
                            <NavbarTab icon='question' help='New Question' to='/main/newquestion' path={ pathname } />
                            <NavbarTab icon='list alternate' help='Leaderboard' to='/main/leaderboard' path={ pathname } />
                        </ButtonGroup>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={ 4 }>
                    <Grid>
                        <Grid.Column width={ 10 }>
                            {user.authenticated && (
                                <Label className='navbar-user-info' image>
                                    <span><small>Hello,</small><br /><b>{ user.name }</b></span>
                                    <Image src={ user.avatarURL } />
                                </Label>
                            )}
                        </Grid.Column>
                        <Grid.Column width={ 2 }>
                            <NavbarTab
                                className='navbar-session'
                                icon='sign in'
                                help='Login'
                                to='/main/login'
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

export default withRouter(Navbar);
