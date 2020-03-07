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
            <Grid padded centered>
                <ButtonGroup className='navbar-menu' attached='top'>
                    <NavbarTab icon='home' help='Home' to='/main' />
                    <NavbarTab icon='question' help='New Question' to='/main/newquestion' />
                    <NavbarTab icon='list alternate' help='Leaderboard' to='/main/leaderboard' />
                </ButtonGroup>
            </Grid>
        );
    }
}

function mapStateToProps({ [AppAction.Key]: store })
{
    return { store };
}

export default connect(mapStateToProps)(Navbar);
