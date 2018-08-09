import * as React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';

import { PRIMARY } from '../shared/styles';

export default (props: NavigationScreenProps): JSX.Element => {
  const uri = props.navigation.getParam('uri');
  // const base64 = props.navigation.getParam('base64');

  return (
    <View style={{ flex: 1 }}>
      <Header
        outerContainerStyles={{ backgroundColor: PRIMARY, borderBottomColor: PRIMARY }}
        centerComponent={{ text: 'Grapevine PD', style: { color: '#fff', fontSize: 20, fontWeight: '600' } }} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.25 }}>
          <Image
            style={{ height: '100%', width: Dimensions.get('window').width }}
            source={{ uri }} />
        </View>
        <View style={{ flex: 0.4, padding: 15 }}>
          <View style={{ flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end' }}>
            <Button
              title="Analyze"
              backgroundColor={PRIMARY}
              style={{ marginBottom: 20 }}
              onPress={() => console.log('analyze')}
              raised
              large />
            <Button
              title="Cancel"
              onPress={() => props.navigation.navigate('HomeScreen')}
              raised
              large />
          </View>
        </View>
      </View>
    </View>
  );
};