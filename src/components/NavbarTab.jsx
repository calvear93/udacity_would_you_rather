import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

class NavbarTab extends React.Component
{
    state = {
        active: false
    }

    render()
    {
        const {
            className,
            icon,
            help,
            to = '/',
            style,
            ...rest
        } = this.props;

        return (
            <Link to={to}>
                <Button
                    animated='fade'
                    className={
                        [ 'navbar-tab', className, this.state.active ? 'active' : undefined ]
                            .filter(c => typeof c === 'string' && c.length > 0)
                            .join(' ')
                    }
                    style={style || {
                        minWidth: '8rem',
                        width: '12vw'
                    }}
                    {...rest}
                >
                    <Button.Content visible><Icon name={icon} /></Button.Content>
                    <Button.Content hidden>{help}</Button.Content>
                </Button>
            </Link>
        );
    }
}

export default NavbarTab;
