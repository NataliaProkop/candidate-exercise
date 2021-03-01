import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import { useStore } from './ContexProvider';
import { PASSWORD_REGEX } from '../utils/regexp';
import styles from '../App.module.css';

interface RegistrerFormProps { }

export const RegistrerForm: React.FC<RegistrerFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const store = useStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearMessages();
    if (!EmailValidator.validate(email)) {
      setErrorMessage('Email is not valid!');
      return;
    } else if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage('Password must have at least 5 characters and at least 1 large letter!');
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage('Confirm password and password are different');
      return;
    }
    handleRegister();
  }

  const clearMessages = () => {
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleRegister = async () => {
    const result = await store.register(email, password);
    if (result.success) {
      setSuccessMessage(result.message)
    } else {
      setErrorMessage(result.message)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <p className={styles.ErrorMessage}>{errorMessage}</p>
      <p className={styles.SuccessMessage}>{successMessage}</p>
      <div className={styles.LoginRow}>
        <label>Email address:</label>
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
      <div className={styles.LoginRow}>
        <label>Confirm Password:</label>
        <input type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  )
};

export default RegistrerForm;
