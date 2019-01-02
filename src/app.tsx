import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import ResultsScreen from './screens/results.screen';
import Camera from './containers/camera.container';
import enhancers from './store/middlewares';
import rootReducer from './store/reducers';

const store = createStore(rootReducer, enhancers);

const RootNavigator = createStackNavigator(
  {
    Camera,
    ResultsScreen
  },
  {
    initialRouteName: 'Camera',
    headerMode: 'none'
  }
);

const App = (): JSX.Element => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;