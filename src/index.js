import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import firebase from 'firebase';
import { Router } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import browserHistory from './browserHistory';
import fbConfig from './firebaseConfiguration';

import App from './AppContainer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore(); // Optional pass in an initialState.

firebase.initializeApp(fbConfig);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// updating app on background
registerServiceWorker();
