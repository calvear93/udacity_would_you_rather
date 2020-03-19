import React from 'react';
import { Route } from 'react-router-dom';

class RouteWithLayout extends React.Component
{
    render()
    {
        const { component: Component, layout: Layout, render, ...rest } = this.props;

        return (
            <Route { ...rest }
                render={ (props) => (
                    <Layout { ...props }>
                        {Component ? <Component { ...props } /> : render(props)}
                    </Layout>
                ) }
            />
        );
    }
}

export default RouteWithLayout;
