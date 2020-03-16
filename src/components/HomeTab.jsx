
import React from 'react';
import { Label, Menu, Tab } from 'semantic-ui-react';

const HomeTab = ({ key, title, color, counter = 0, loading = false, render: Content }) => ({
    menuItem: (
        <Menu.Item key={ key } className='tab'>
            <span className={ key }>{title}</span>
            <Label color={ color } floating>{counter}</Label>
        </Menu.Item>
    ),
    render: () => (
        <Tab.Pane className='tab-content' loading={ loading }>
            <Content />
        </Tab.Pane>
    )
});

export default HomeTab;
