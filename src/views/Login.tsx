import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styles from '../App.module.css';

interface LoginProps { }

export const Login: React.FC<LoginProps> = () => {
  return (
    <div className={styles.Login}>
      <div className={styles.LoginForm}>
        <h3>Login</h3>
        <LoginForm />
      </div>
      <div>
        <h3>Register</h3>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Login;
