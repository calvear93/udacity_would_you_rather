import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomePage, LeaderBoardPage, LoginPage, NewQuestionPage, NotFoundPage } from './';
import AppLayout from './layouts/AppLayout';
import RouteWithLayout from './layouts/RouteWithLayout';

/**
 * Renders the main application view.
 * Contains routing logic for different
 * app pages, applying default layouts
 * for JSX pages decomposition.
 *
 * @class App
 * @extends {React.PureComponent}
 */
class App extends React.PureComponent
{
    /**
     * Renders the main application.
     *
     * @returns {JSX} Main app renderer.
     * @memberof App
     */
    render()
    {
        return (
            <div className='app'>
                <Switch>
                    <Redirect exact from='/' to='/main' />

                    <RouteWithLayout
                        exact path='/main/login'
                        layout={AppLayout}
                        component={LoginPage}
                    />

                    <RouteWithLayout
                        exact path='/main'
                        layout={AppLayout}
                        component={HomePage}
                    />

                    <RouteWithLayout
                        exact path='/main/newquestion'
                        layout={AppLayout}
                        component={NewQuestionPage}
                    />

                    <RouteWithLayout
                        exact path='/main/leaderboard'
                        layout={AppLayout}
                        component={LeaderBoardPage}
                    />

                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
