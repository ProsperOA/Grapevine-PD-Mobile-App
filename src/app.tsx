import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import AuthScreen from './screens/auth.screen';
import HomeScreen from './screens/home.screen';
import ResultsScreen from './screens/results.screen';
import enhancers from './store/middlewares';
import rootReducer from './store/reducers';

const store = createStore(rootReducer, enhancers);

const RootNavigator = createStackNavigator(
  {
    AuthScreen,
    HomeScreen,
    ResultsScreen
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