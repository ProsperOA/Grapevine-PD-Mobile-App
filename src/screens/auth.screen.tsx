import * as React from 'react';
import * as t from 'tcomb-form-native';
import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button } from 'react-native-elements';

import * as actions from '../store/actions';
import { LoginForm, SignUpForm } from '../models/forms/auth.form';
import AuthCredentials from '../models/auth-credentials.model';

interface AuthProps {
  login: (credentials: AuthCredentials) => (
    Dispatch<actions.ILoginSuccess | actions.ILoginFailed>
  );
}

interface AuthStateLocal {
  email: string;
  password: string;
  signingUp: boolean;
  formValue: any;
}

const Form = t.form.Form;

class AuthScreen extends React.Component<AuthProps, AuthStateLocal> {
  public state = {
    email: '',
    password: '',
    signingUp: false,
    formValue: null
  };
  public authFormsRef: any;

  public onLogin = (): void => {
    const credentials: AuthCredentials = this.refs.loginForm.getValue();
    if (!credentials) return;

    this.props.login(credentials);
  };

  public onSignUp = (): void => {
    // TODO: add sign up logic
  };

  public onForgotPassword = (): void => {
    // TODO: add reset password logic
  };

  public changeAuthForm = (signingUp: boolean): void => {
    this.authFormsRef.fadeIn(500);
    this.setState({ signingUp });
  };

  public renderLoginForm = (): JSX.Element => (
    <View style={{flex: 1}}>
      <Form
        ref="loginForm"
        type={LoginForm.type}
        options={LoginForm.options}
        value={this.state.formValue}
        onChange={(formValue: any) => this.setState({ formValue })}>
      </Form>
      <Button
        title="Login"
        style={{marginBottom: 15}}
        onPress={this.onLogin} />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.5, alignItems: 'flex-start'}}>
          <Button
            title="Create an account"
            color="#000"
            fontSize={14}
            onPress={() => this.changeAuthForm(true)}
            transparent />
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          <Button
            title="Forgot password?"
            color="#000"
            fontSize={14}
            onPress={this.onForgotPassword}
            transparent />
        </View>
      </View>
    </View>
  );

  public renderSignUpForm = (): JSX.Element => (
    <View style={{flex: 1}}>
      <Form
        ref="signUpForm"
        type={SignUpForm.type}
        options={SignUpForm.options}
        value={this.state.formValue}
        onChange={(formValue: any) => this.setState({ formValue })}>
      </Form>
      <Button
        title="Sign Up"
        style={{marginBottom: 15}}
        onPress={this.onSignUp} />
      <Button
        title="Back to Login"
        color="#000"
        fontSize={14}
        onPress={() => this.changeAuthForm(false)}
        transparent />
    </View>
  );

  public render(): JSX.Element {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={500}
        style={{flex: 1, padding: 15}}>
        <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Grapevine PD</Text>
        </View>
        <Animatable.View
          ref={(ref: any) => this.authFormsRef = ref}
          style={{flex: 0.7}}>
          {this.state.signingUp
            ? this.renderSignUpForm()
            : this.renderLoginForm()}
        </Animatable.View>
      </Animatable.View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthAction>) => ({
  login: (credentials: AuthCredentials) => dispatch(actions.login(credentials))
});

export default connect(null, mapDispatchToProps)(AuthScreen)