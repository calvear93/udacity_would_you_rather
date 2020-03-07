import React from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import Navbar from '../../components/Navbar';
import NavbarTab from '../../components/NavbarTab';
import '../../styles/components/navbar.scss';

class AppLayout extends React.PureComponent
{
    render()
    {
        return (
            <Grid stackable centered padded className='app-container' columns='equal'>
                {/* style={{ paddingBottom: .35 }} */}
                <Grid.Row className='navbar-container' columns={3}>
                    <Grid.Column width={4} />
                    <Grid.Column width={6}>
                        <Navbar />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <label>Hello, Cristopher Alvear</label>
                        <NavbarTab className='navbar-session' icon='sign in' help='Login' to='/main/login' width='6vw' minWidth='2rem' />
                    </Grid.Column>
                </Grid.Row>
                <Divider className='navbar-divider' fitted style={{ marginTop: 0 }} />
                <Grid.Row>
                    <Grid.Column width={8} color='blue'>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default AppLayout;
