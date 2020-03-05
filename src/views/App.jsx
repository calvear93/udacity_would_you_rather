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
                    <Redirect exact from='/' to='/main/' />
                    <Redirect exact from='/main' to='/main/' />

                    <Route exact path='/main/*' render={() => (
                        <>
                            <Route path='/main' render={(route) => (
                                <><label>NAVBAR</label><br /></>
                            )}
                            />
                            <Route exact path='/main/xd' render={(route) => (
                                <label>XD: { JSON.stringify(route.match.params) }</label>
                            )}
                            />
                            <Route exact path='/main/test' render={(route) => (
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
