import * as React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

class HomeScreen extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

export default connect()(HomeScreen);