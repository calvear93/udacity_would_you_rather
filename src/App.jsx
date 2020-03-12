import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Loader, Segment, Dimmer, Image } from 'semantic-ui-react';
import AppLayout from './views/layouts/AppLayout';
import RouteWithLayout from './views/layouts/RouteWithLayout';

const HomePage = lazy(() => import('./views/HomePage'));
const LeaderBoardPage = lazy(() => import('./views/LeaderBoardPage'));
const LoginPage = lazy(() => import('./views/LoginPage'));
const NewQuestionPage = lazy(() => import('./views/NewQuestionPage'));
const NotFoundPage = lazy(() => import('./views/NotFoundPage'));

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
            <Suspense fallback={ <Loader size='large'>Loading</Loader> }>
                <div className='app'>
                <Segment>
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Segment>
                    <Switch>
                        <Redirect exact from='/' to='/main/login' />

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
