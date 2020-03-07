import React from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import Navbar from '../../components/Navbar';
import '../../styles/components/navbar.scss';

class AppLayout extends React.PureComponent
{
    render()
    {
        return (
            <Grid stackable centered padded className='app-container' columns='equal'>
                <Grid.Row className='navbar-container' columns={3}>
                    <Navbar />
                </Grid.Row>

                <Divider className='navbar-divider' fitted />

                <Grid.Row>
                    <Grid.Column width={8}>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default AppLayout;
