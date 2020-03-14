import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Divider, Grid } from 'semantic-ui-react';
import Navbar from '../../components/Navbar';
import { SessionAction } from '../../store/actions';
import '../../styles/layouts/app-layout.scss';

class AppLayout extends React.PureComponent
{
    render()
    {
        const { user, location: { pathname } } = this.props;

        return user.authenticated || pathname === '/main/login' ?
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
            : <Redirect to='/main/login' />;
    }
}

function mapStateToProps({ [SessionAction.Key]: user })
{
    return { user };
}

export default connect(mapStateToProps)(AppLayout);
