import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { Permissions, PictureResponse } from 'expo';
import { connect } from 'react-redux';
import { NavigationActions, NavigationScreenProps } from 'react-navigation';

import Camera from '../containers/camera.container';
import { PRIMARY } from '../shared/styles';

interface HomeState {
  hasCameraPermission: boolean;
}

class HomeScreen extends React.Component<NavigationScreenProps, HomeState> {
  public state: Readonly<HomeState> = {
    hasCameraPermission: false
  };

  public onHeaderCameraButtonPress = async (): Promise<void> => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  public onTakePicture = ({uri, base64}: PictureResponse): void => {
    this.setState({ hasCameraPermission: false });

    const navigateAction = NavigationActions.navigate({
      routeName: 'ResultsScreen',
      params: {uri, base64},
    });
    this.props.navigation.dispatch(navigateAction);
  };

  public renderHeaderCameraButton = (): JSX.Element => (
    <TouchableOpacity onPress={() => this.onHeaderCameraButtonPress()}>
      <Icon name="camera-alt" color="#fff" />
    </TouchableOpacity>
  );

  public render(): JSX.Element {
    if (this.state.hasCameraPermission) {
      return (
        <Camera
          onTakePicture={this.onTakePicture}
          close={() => this.setState({ hasCameraPermission: false })} />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ backgroundColor: PRIMARY }}
          leftComponent={this.renderHeaderCameraButton()}
          centerComponent={{ text: 'Grapevine PD', style: { color: '#fff', fontSize: 20, fontWeight: '600' } }} />
        <View style={{ flex: 1, padding: 15 }}>
          <View style={{ flex: 0.1 }}>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>
              Your Images
            </Text>
          </View>
          <View style={{ flex: 0.9, padding: 15 }}>
            <Text>images...</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect()(HomeScreen);