import * as React from 'react';
import { Button, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as actions from '../store/actions';

interface AuthProps {
  login: (email: string, password: string) => (
    Dispatch<actions.ILoginSuccess | actions.ILoginFailed>
  );
}

interface AuthStateLocal {
  email: string;
  password: string;
}

class AuthScreen extends React.Component<AuthProps, AuthStateLocal> {
  public onLogin = (): void => {
    const { email, password } = this.state;
    if (email && password) this.props.login(email, password);
  };

  public render(): JSX.Element {
    return (
      <View>
        <TextInput
          style={{borderWidth: 1, borderColor: '#000', margin: 15}}
          onChangeText={email => this.setState({ email })} />
        <TextInput
          style={{borderWidth: 1, borderColor: '#000', margin: 15}}
          onChangeText={password => this.setState({ password })} />
        <Button
          title="Login"
          onPress={this.onLogin} />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthAction>) => ({
  login: (email: string, password: string) => dispatch(actions.login(email, password))
});

export default connect(null, mapDispatchToProps)(AuthScreen)