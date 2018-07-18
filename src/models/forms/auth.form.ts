import * as t from 'tcomb-form-native';

import { EMAIL_REGEX } from '../../shared/utils';

const Email = t.refinement(t.String, (val: string) => EMAIL_REGEX.test(val))
const Password = t.refinement(t.String, (val: string) => val.length >= 6);

const EmailOptions = {
  textContentType: 'emailAddress',
  keyboardType: 'email-address',
  error: 'invalid email',
};

const PasswordOptions = {
  textContentType: 'password',
  secureTextEntry: true,
  maxLength: 50,
  error: 'required',
};

export const LoginForm = {
  type: t.struct({
    email: Email,
    password: Password
  }),
  options: {
    auto: 'labels',
    fields: {
      email: EmailOptions,
      password: PasswordOptions
    }
  }
};

export const SignUpForm = {
  type: t.struct({
    email: Email,
    password: Password,
    confirmPassword: Password,
  }),
  options: {
    auto: 'labels',
    fields: {
      email: EmailOptions,
      password: PasswordOptions,
      confirmPassword: {
        ...PasswordOptions,
        label: 'Confirm Password',
        error: 'passwords must match',
        hasError: false
      }
    }
  }
}