import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

/**
 * Tab for the app navbar.
 *
 * @class NavbarTab
 * @extends {React.Component}
 */
class NavbarTab extends React.Component
{
    /**
     * Renders the tab.
     *
     * @returns {JSX} Tab for app navbar.
     * @memberof NavbarTab
     */
    render()
    {
        const {
            className,
            icon,
            help, // Tab text.
            to, // Tab route.
            onClick, // Tab function, used for logout.
            path, // Current path.
            style,
            disabled,
            ...rest
        } = this.props;

        // Renders a Link component if tab isn't disabled.
        const Wrapper = disabled || !to ? (props) => (<div>{props.children}</div>) : Link;

        return (
            <Wrapper to={ to }>
                <Button
                    animated='fade'
                    disabled={ disabled }
                    className={
                        [ 'navbar-tab', className, to === path ? 'active' : undefined ]
                            .filter(c => typeof c === 'string' && c.length > 0)
                            .join(' ')
                    }
                    onClick={ onClick }
                    style={ style || {
                        width: '12vw',
                        minWidth: '8em'
                    } }
                    { ...rest }
                >
                    <Button.Content visible><Icon name={ icon } /></Button.Content>
                    <Button.Content hidden>{help}</Button.Content>
                </Button>
            </Wrapper>
        );
    }
}

NavbarTab.propTypes = {
    children: PropTypes.objectOf(PropTypes.any),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    help: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    path: PropTypes.string.isRequired,
    style: PropTypes.objectOf(PropTypes.any),
    to: PropTypes.string
};

export default NavbarTab;
