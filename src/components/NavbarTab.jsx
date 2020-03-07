import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import '../styles/components/navbar-tab.scss';

class NavbarTab extends React.Component
{
    render()
    {
        const { icon, help, ...rest } = this.props;

        return (
            <Button className='navbar-tab' animated='fade' {...rest}
                style={{
                    minWidth: '8rem',
                    width: '12vw'
                }}
            >
                <Button.Content visible><Icon name={icon} /></Button.Content>
                <Button.Content hidden>{help}</Button.Content>
            </Button>
        );
    }
}

export default NavbarTab;
