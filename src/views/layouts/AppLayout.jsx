import React from 'react';

class AppLayout extends React.PureComponent
{
    render()
    {
        return (
            <div className='app-container'>
                <label>test</label>
                {this.props.children}
            </div>
        );
    }
}

export default AppLayout;
