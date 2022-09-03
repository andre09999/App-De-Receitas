import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Button, setButton] = useState('');
  const history = useHistory();

  useEffect(() => {
    const number = 6;
    const valid = /\S+@\S+\.\S+/;
    if (valid.test(Email) && Password.length > number) {
      setButton(false);
    } if (!valid.test(Email) || Password.length < number) {
      setButton(true);
    }
  }, [Email, Password]);

  return (
    <div className="container-login">
      <form className="login">
        <h1 className="title-login">Memorable Food</h1>
        <input
          data-testid="email-input"
          type="email"
          placeholder="email"
          className="password"
          id="email"
          onChange={ ({ target }) => {
            setEmail(target.value);
          } }
        />

        <input
          data-testid="password-input"
          type="password"
          placeholder="password"
          id="password"
          className="password"
          onChange={ ({ target }) => {
            setPassword(target.value);
          } }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          className="login-btn"
          disabled={ Button }
          onClick={ () => {
            localStorage.setItem('user', JSON.stringify({ email: Email }));
            localStorage.setItem('mealsToken', JSON.stringify(1));
            localStorage.setItem('cocktailsToken', JSON.stringify(1));
            history.push('/foods');
          } }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
