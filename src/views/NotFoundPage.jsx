import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../styles/views/not-found.scss';

/**
 * Not Found page.
 * Showing on invalid route.
 *
 * @class NotFoundPage
 * @extends {React.Component}
 */
class NotFoundPage extends React.Component
{
    /**
     * Renders the 404 not found info page.
     *
     * @returns {JSX} Not Found page.
     * @memberof NotFoundPage
     */
    render()
    {
        return (
            <div className='ui grid middle aligned'>
                <div className='notfound'>
                    <div className='notfound-404 ui inverted statistic'>
                        <h1>404!</h1>
                    </div>
                    <h2>The route you're looking for can't be found!</h2>
                    <Link to='/'>
                        <Button color='teal' icon={{ className: 'mdi mdi-keyboard-return' }} content='Return To Homepage' />
                    </Link>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;
