import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class AppLayout extends React.PureComponent
{
    render()
    {
        return (
            <div className='app-container'>
                <label>NAVBAR</label> <br />
                {this.props.children}
                <Grid centered columns={2} padded='horizontally'>
                    <Grid.Column color='red'>
                        <label>asdsad</label>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default AppLayout;
