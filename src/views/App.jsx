import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

class App extends React.Component
{
    render()
    {
        return (
            <div className='app'>
                <Switch>
                    <Route exact path='/' render={() => (
                        <div>
                            Root
                        </div>
                    )}
                    />

                    <Route render={(route) => (
                        <NotFoundPage route={route} />
                    )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
