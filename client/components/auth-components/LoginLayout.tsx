import React from 'react';

import AuthHedaer from './AuthHedaer';
import LoginForm from '../shared-components/LoginForm';


const LoginLayout = () => {
  return (
    <AuthHedaer>
      <LoginForm/>
    </AuthHedaer>
  );
};

export default LoginLayout;
