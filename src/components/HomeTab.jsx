
import React from 'react';
import { Label, Menu, Tab } from 'semantic-ui-react';

const HomeTab = ({ key, icon, title, color, counter = 0, render: Content }) => ({
    menuItem: (
        <Menu.Item key={ key } className='tab' centered grid>
            <span className={ key }>{title}</span>
            <Label color={ color } floating>{counter}</Label>
        </Menu.Item>
    ),
    render: () => (
        <Tab.Pane className='tab-content'>
            <Content />
        </Tab.Pane>
    )
});

export default HomeTab;
