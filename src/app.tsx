import * as React from 'react';
import * as firebase from 'firebase';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import AuthScreen from './screens/auth.screen';
import HomeScreen from './screens/home.screen';
import enhancers from './store/middlewares';
import rootReducer from './store/reducers';

const firebaseConfig = {
  apiKey: "AIzaSyDoUjGfzkYA6y7JMdf-FR0E-6ddgfM3Q9E",
  authDomain: "grapevine-pd.firebaseapp.com",
  databaseURL: "https://grapevine-pd.firebaseio.com",
  projectId: "grapevine-pd",
  storageBucket: "grapevine-pd.appspot.com",
  messagingSenderId: "911491514094"
};

firebase.initializeApp(firebaseConfig);

const store = createStore(rootReducer, enhancers);

const RootNavigator = createStackNavigator(
  {
    AuthScreen,
    HomeScreen
  },
  {
    initialRouteName: 'AuthScreen',
    headerMode: 'none'
  }
);

const App = (): JSX.Element => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;