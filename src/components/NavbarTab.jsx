import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

class NavbarTab extends React.Component
{
    render()
    {
        const {
            className,
            icon,
            help,
            to = '/',
            path,
            style,
            ...rest
        } = this.props;

        return (
            <Link to={to}>
                <Button
                    animated='fade'
                    className={
                        [ 'navbar-tab', className, to === path ? 'active' : undefined ]
                            .filter(c => typeof c === 'string' && c.length > 0)
                            .join(' ')
                    }
                    style={style || {
                        width: '12vw',
                        minWidth: '8em'
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
