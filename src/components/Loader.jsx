import React from 'react';
import { Dimmer, Loader as Loading } from 'semantic-ui-react';

class Loader extends React.PureComponent
{
    render()
    {
        const { message } = this.props;

        return (
            <Dimmer active inverted>
                <Loading inverted>{message}</Loading>
            </Dimmer>
        );
    }
}

export default Loader;
