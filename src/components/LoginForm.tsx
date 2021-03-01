
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { useStore } from './ContexProvider';
import { PASSWORD_REGEX } from '../utils/regexp'
import styles from '../App.module.css';

interface RegistrerFormProps { }

export const RegistrerForm: React.FC<RegistrerFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const store = useStore();
  const history = useHistory();

  const handleLogin = async () => {
    const result = await store.login(email, password);
    if (result.success) {
      history.push('/')
    } else {
      setErrorMessage(result.message)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('')
    if (!EmailValidator.validate(email)) {
      setErrorMessage('Email is not valid!');
      return;
    } else if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage('Password must have at least 5 characters and at least 1 large letter!');
      return;
    }
    handleLogin();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className={styles.ErrorMessage}>{errorMessage}</p>
      <div className={styles.LoginRow}>
        <label>Email:</label>
        <input type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.LoginRow}>
        <label>Password:</label>
        <input type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
};

export default RegistrerForm;