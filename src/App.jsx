import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { HomePage, LeaderBoardPage, LoginPage, NewQuestionPage, NotFoundPage } from './views';
// import AppLayout from './views/layouts/AppLayout';
// import RouteWithLayout from './views/layouts/RouteWithLayout';
import Loader from './components/Loader';

// Lazy loaded components.
const HomePage = lazy(() => import('./views/HomePage'));
const LeaderBoardPage = lazy(() => import('./views/LeaderBoardPage'));
const LoginPage = lazy(() => import('./views/LoginPage'));
const NewQuestionPage = lazy(() => import('./views/NewQuestionPage'));
const NotFoundPage = lazy(() => import('./views/NotFoundPage'));
const RouteWithLayout = lazy(() => import('./views/layouts/RouteWithLayout'));
const AppLayout = lazy(() => import('./views/layouts/AppLayout'));

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
            <Suspense fallback={ <Loader message='Loading Content' /> }>
                <div className='app'>
                    <Switch>
                        <RouteWithLayout
                            exact path='/main/login'
                            layout={ AppLayout }
                            component={ LoginPage }
                        />

                        <RouteWithLayout
                            exact path='/main'
                            layout={ AppLayout }
                            component={ HomePage }
                        />

                        <RouteWithLayout
                            exact path='/main/newquestion'
                            layout={ AppLayout }
                            component={ NewQuestionPage }
                        />

                        <RouteWithLayout
                            exact path='/main/leaderboard'
                            layout={ AppLayout }
                            component={ LeaderBoardPage }
                        />

                        <Route component={ NotFoundPage } />
                    </Switch>
                </div>
            </Suspense>
        );
    }
}

export default App;
