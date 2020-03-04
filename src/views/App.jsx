import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Test from '../components/Test';

/**
 * Main app container.
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component
{
    /**
     * Renders main App container.
     *
     * @returns {any} JSX app.
     * @memberof App
     */
    render()
    {
        return (
            <div className='app'>
                <Switch>
                    <Route exact path='/' render={() => (
                        <div>
                            <Test />
                        </div>
                    )}
                    />

                    <Route exact path='/main' render={() => (
                        <div>
                            main
                        </div>
                    )}
                    />

                    <Route render={() => (
                        <div>
                            Page not found!
                        </div>
                    )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
