import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu';
import Login from './Login/Login';
import ResetPassword from './Login/ResetPassword';
import Come from './pages/Come';
import DeleteAccount from './pages/DeleteAccount';
import Enjoy from './pages/Enjoy';
import Live from './pages/Live';
import NotFound from './pages/NotFound'
import Page from './pages/Page';
import Privacy from './pages/Privacy'
import Profile from './pages/Profile';
import Stay from './pages/Stay';
import Terms from './pages/Terms'
import Welcome from './pages/Welcome'
import About from './pages/About'
import StartupService from './services/startup.service';

/* Theme variables */
import './theme/variables.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';

setupIonicReact();
const startupService = StartupService.getInstance();
const startupRoute = startupService.getStartupRoute();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
          <Switch>

            <Route path="/" exact={true}>
              <Redirect to={startupRoute || '/welcome'} /> {/*"/page" /> */}
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/come" component={Come} />
            <Route path="/stay" component={Stay} />
            <Route path="/enjoy" component={Enjoy} />
            <Route path="/live" component={Live} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/about" component={About} />
            <Route path="/delete" component={DeleteAccount} />
            <Route path="/resetpassword/:token" component={ResetPassword} />
            <Route path='/privacy' component={Privacy} />
							<Route path='/terms' component={Terms} />
              <Route component={NotFound} />
          </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
