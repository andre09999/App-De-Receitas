import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from '../Pages/Login'
import App from '../App'

describe('Testa a tela de login', () => {
  it('Deve renderizar a tela de login corretamente', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <App />
      </Router>
    );
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('login-submit-btn')
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })
  it('Deve ser possível digitar nos inputs', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('login-submit-btn')

    expect(submitButton).toBeDisabled()
    userEvent.type(emailInput, 'teste@teste.com')
    userEvent.type(passwordInput, 'senhadeteste')
    expect(submitButton).not.toBeDisabled();
    expect(emailInput.value).toBe('teste@teste.com')
    expect(passwordInput.value).toBe('senhadeteste')
    userEvent.click(submitButton)
    const { location: {pathname}  } = history;
    expect(pathname).toBe('/foods')
  })
})