import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import NotFoundPage from './NotFoundPage';

class App extends React.Component
{
    render()
    {
        return (
            <div className='app'>
                <Switch>
                    <Redirect exact from='/' to='/main' />
                    <Route path='/main/*' render={() => (
                        <>
                            <Route exact path='/main/*' render={(route) => (
                                <><label>NAVBAR</label><br /></>
                            )}
                            />
                            <Route exact path='/main/:section' render={(route) => (
                                <label>SECTION: { JSON.stringify(route.match.params) }</label>
                            )}
                            />
                            <Route exact path='/main/test/:section' render={(route) => (
                                <label>TEST: { JSON.stringify(route.match.params) }</label>
                            )}
                            />
                        </>
                    )}
                    />

                    <Route render={(route) => <NotFoundPage route={route} />} />
                </Switch>
            </div>
        );
    }
}

export default App;
