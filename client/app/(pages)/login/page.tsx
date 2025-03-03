"use client";

import React from 'react';
import Container from '@/app/components/ui/Container';
import useAuth from '@/app/hooks/useAuth';

const Login = () => {
  const { handleLogin } = useAuth();
  return (
    <Container center>
      <h2>Please wait for pop-up authentication</h2>
      <br />
      <button onClick={handleLogin} className='borderButton'>Sign In</button>
    </Container>
  );
};

export default Login;
