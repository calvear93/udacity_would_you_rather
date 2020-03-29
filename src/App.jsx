import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';

// Lazy loaded components.
const HomePage = lazy(() => import('./views/HomePage'));
const QuestionVotePage = lazy(() => import('./views/QuestionVotePage'));
const QuestionSummaryPage = lazy(() => import('./views/QuestionSummaryPage'));
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
                <div className='app unselectable'>
                    <Switch>
                        <Redirect exact from='/' to='/main' />

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
                            exact path='/add'
                            layout={ AppLayout }
                            component={ NewQuestionPage }
                        />

                        <RouteWithLayout
                            exact path='/leaderboard'
                            layout={ AppLayout }
                            component={ LeaderBoardPage }
                        />

                        <RouteWithLayout
                            exact path='/answer/:id'
                            layout={ AppLayout }
                            component={ QuestionVotePage }
                        />

                        <RouteWithLayout
                            exact path='/questions/:id'
                            layout={ AppLayout }
                            component={ QuestionSummaryPage }
                        />

                        <Route component={ NotFoundPage } />
                    </Switch>
                </div>
            </Suspense>
        );
    }
}

export default App;
