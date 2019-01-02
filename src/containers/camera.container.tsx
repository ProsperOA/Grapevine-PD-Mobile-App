import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Camera, PictureResponse } from 'expo';
import { NavigationActions, NavigationScreenProps } from 'react-navigation';

interface CameraState {
  type: string;
  hasPhotoGalleryPermission: boolean;
}

export default class extends React.Component<NavigationScreenProps, CameraState> {
  public cameraRef: any;
  public state: Readonly<CameraState> = {
    type: Camera.Constants.Type.back,
    hasPhotoGalleryPermission: false
  };

  public onTakePicture = (): void => {
    if (!this.cameraRef) return;

    this.cameraRef.takePictureAsync({base64: true})
      .then(({ uri, base64 }: PictureResponse) => {
        const navigateAction = NavigationActions.navigate({
          routeName: 'ResultsScreen',
          params: {uri, base64},
        });

        this.props.navigation.dispatch(navigateAction);
      });
  };

  // public onSelectImage = async (): Promise<void> => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   this.setState({ hasPhotoGalleryPermission: status === 'granted' });

  //   if (!this.state.hasPhotoGalleryPermission) return;

  //   ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     base64: true
  //   })
  //   .then((result: any) => {
  //     if (!result.cancelled) this.onTakePicture(result);
  //   });
  // };

  public render(): JSX.Element {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={(ref: any) => this.cameraRef = ref}
          style={{ flex: 1, padding: 15 }}
          type={this.state.type}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                });
              }}>
              <Icon
                name="switch-camera"
                iconStyle={{ color: '#fff', fontSize: 25, marginBottom: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 0.8, alignSelf: 'flex-end', alignItems: 'center' }}
              onPress={this.onTakePicture}>
              <Icon
                name="camera"
                iconStyle={{ color: '#fff', fontSize: 50, marginBottom: 10 }} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}