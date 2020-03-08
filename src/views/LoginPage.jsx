import React from 'react';
import { Card, Button, Header, Image, Grid, Dropdown } from 'semantic-ui-react';
import '../styles/views/login.scss';
import { Logo } from '../assets/images';
import { Male, Female } from '../assets/images/avatars';

const users = [
    {
        key: 'Jenny Hess',
        text: 'Jenny Hess',
        value: 'Jenny Hess',
        image: { avatar: true, src: Female }
    },
    {
        key: 'Elliot Fu',
        text: 'Elliot Fu',
        value: 'Elliot Fu',
        image: { avatar: true, src: Male }
    },
    {
        key: 'Stevie Feliciano',
        text: 'Stevie Feliciano',
        value: 'Stevie Feliciano',
        image: { avatar: true, src: Male }
    },
    {
        key: 'Christian',
        text: 'Christian',
        value: 'Christian',
        image: { avatar: true, src: Male }
    },
    {
        key: 'Matt',
        text: 'Matt',
        value: 'Matt',
        image: { avatar: true, src: Male }
    },
    {
        key: 'Justen Kitsune',
        text: 'Justen Kitsune',
        value: 'Justen Kitsune',
        image: { avatar: true, src: Male }
    }
];

class LoginPage extends React.Component
{
    state = {
        value: null
    }

    onSignIn = () =>
    {
        console.log(this.state.value);
    }

    handleChange = (e, { value }) => this.setState({ value })

    render()
    {
        return (
            <>
                <Card centered fluid>
                    <Card.Content className='login-header'>
                        <Header className='login-title centered' as='h2'>Welcome to the Would You Rather App!</Header>
                        <Header className='login-subtitle centered' as='h4'>Please sign in to continue</Header>
                    </Card.Content>

                    <Card.Content>
                        <Grid centered padded>
                            <Image src={Logo} size='small' />
                        </Grid>
                        <Header className='login-sign-in-info centered' as='h1'>Sign in</Header>
                    </Card.Content>

                    <Card.Content extra>
                        <Dropdown
                            className='login-user-selector'
                            placeholder='Select User'
                            closeOnEscape
                            fluid
                            selection
                            onChange={this.handleChange}
                            options={users}
                        />
                        <Button
                            className='login-sign-in'
                            fluid
                            color='teal'
                            onClick={this.onSignIn}
                        >
                            Sign in
                        </Button>
                    </Card.Content>
                </Card>
            </>
        );
    }
}

export default LoginPage;
