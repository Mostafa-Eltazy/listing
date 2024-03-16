import React from 'react';
import RegistrationForm from '../shared-components/RegistrationForm';
import AuthHedaer from './AuthHedaer';

const SignupLayout = () => {
  return (
    <AuthHedaer>
      <RegistrationForm />
    </AuthHedaer>
  );
};

export default SignupLayout;
