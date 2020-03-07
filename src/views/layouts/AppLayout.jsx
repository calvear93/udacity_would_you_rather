import React from 'react';
import { Grid, Image, Header, Icon, Divider } from 'semantic-ui-react';
import Navbar from '../../components/Navbar';

class AppLayout extends React.PureComponent
{
    render()
    {
        return (
            <Grid className='app-container' centered columns='equal' padded>
                <Grid.Row columns={3} style={{ paddingBottom: 1 }}>
                    <Grid.Column width={2} />
                    <Grid.Column width={6}>
                        <Navbar />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <label>asdsa</label>
                    </Grid.Column>
                </Grid.Row>
                <Divider fitted style={{ marginTop: 0 }} />
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
