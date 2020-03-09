import React from 'react';
import { connect } from 'react-redux';
import { Divider, Grid } from 'semantic-ui-react';
import Navbar from '../../components/Navbar';
import '../../styles/layouts/app-layout.scss';
import { SessionAction } from '../../store/actions';

class AppLayout extends React.PureComponent
{
    render()
    {
        const { user } = this.props;

        return (
            <Grid stackable centered padded className='app-container' columns='equal'>
                <Grid.Row className='navbar-container' columns={ 3 }>
                    <Navbar user={ user } />
                </Grid.Row>

                <Divider className='navbar-divider' fitted />

                <Grid.Row>
                    <Grid.Column width={ 8 }>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

function mapStateToProps({ [SessionAction.Key]: user })
{
    return { user };
}

export default connect(mapStateToProps)(AppLayout);
