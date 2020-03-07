import React from 'react';
import { connect } from 'react-redux';
import AppAction from '../store/actions/app';
import { Grid, Icon, ButtonGroup, Divider } from 'semantic-ui-react';
import NavbarTab from './NavbarTab';

class Navbar extends React.Component
{
    render()
    {
        const { ...rest } = this.props;

        return (
            <>
                <Grid.Column width={4} />
                <Grid.Column width={6}>
                    <Grid padded centered>
                        <ButtonGroup className='navbar-menu' attached='top'>
                            <NavbarTab icon='home' help='Home' to='/main' active />
                            <NavbarTab icon='question' help='New Question' to='/main/newquestion' />
                            <NavbarTab icon='list alternate' help='Leaderboard' to='/main/leaderboard' />
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

function mapStateToProps({ [AppAction.Key]: store })
{
    return { store };
}

export default connect(mapStateToProps)(Navbar);
