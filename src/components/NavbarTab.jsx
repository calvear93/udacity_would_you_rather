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
            minWidth = '8rem',
            width = '12vw',
            ...rest
        } = this.props;

        return (
            <Link to={to}>
                <Button
                    animated='fade'
                    className={
                        [ 'navbar-tab', className ]
                            .filter(c => typeof c === 'string' && c.length > 0)
                            .join(' ')
                    }
                    style={{
                        minWidth: minWidth,
                        width: width
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
