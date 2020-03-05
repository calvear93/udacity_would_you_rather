import React from 'react';
import { Redirect, HashRouter, Route, Switch, Link } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import NotFoundPage from './NotFoundPage';
import { Button } from 'semantic-ui-react';

class App extends React.PureComponent
{
    render()
    {
        return (
            <div className='app'>
                <Switch>
                    <Redirect exact from='/' to='/main/' />
                    <Redirect exact from='/main' to='/main/' />

                    <Route exact path='/main/*' render={(route) => (
                        <AppLayout>
                            <Switch>
                                <Route exact path='/main/xd' render={(route) => (
                                    <label>XD: { JSON.stringify(route.match.params) }</label>
                                )}
                                />

                                <Route exact path='/main/test' render={(route) => (
                                    <label>TEST: { JSON.stringify(route.match.params) }</label>
                                )}
                                />

                                <Redirect to={{
                                    pathname: '/not-found',
                                    state: { search: route.location.pathname }
                                }}
                                />
                            </Switch>
                        </AppLayout>
                    )}
                    />

                    <Route render={(route) => <NotFoundPage route={route} />} />
                </Switch>
            </div>
        );
    }
}

export default App;
