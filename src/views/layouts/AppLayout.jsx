import React from 'react';

class AppLayout extends React.PureComponent
{
    render()
    {
        return (
            <div className='app-container'>
                <label>NAVBAR</label> <br />
                {this.props.children}
            </div>
        );
    }
}

export default AppLayout;
