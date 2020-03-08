import React from 'react';
import { withRouter } from 'react-router-dom';
import { ButtonGroup, Grid } from 'semantic-ui-react';
import NavbarTab from './NavbarTab';

class Navbar extends React.Component
{
    render()
    {
        const { location: { pathname } } = this.props;

        return (
            <>
                <Grid.Column width={4} />
                <Grid.Column width={6}>
                    <Grid padded centered>
                        <ButtonGroup className='navbar-menu' attached='top'>
                            <NavbarTab icon='home' help='Home' to='/main' path={pathname} />
                            <NavbarTab icon='question' help='New Question' to='/main/newquestion' path={pathname} />
                            <NavbarTab icon='list alternate' help='Leaderboard' to='/main/leaderboard' path={pathname} />
                        </ButtonGroup>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={4}>
                    <label>Hello, Cristopher Alvear</label>
                    <NavbarTab
                        className='navbar-session'
                        icon='sign in'
                        help='Login'
                        to='/main/login'
                        path={pathname}
                        style={{
                            width: '6vw',
                            minWidth: '2rem'
                        }}
                    />
                </Grid.Column>
            </>
        );
    }
}

export default withRouter(Navbar);
