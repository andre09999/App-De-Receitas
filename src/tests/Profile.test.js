import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App'
import Profile from '../Pages/Profile';
import FoodsProvider from '../context/FoodsProvider';
import DrinksProvider from '../context/DrinksProvider';


describe.only('Testa a tela de profile', () => {
  it('Deve renderizar a tela de profile corretamente', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <FoodsProvider>
        <DrinksProvider>
          <App />
        </DrinksProvider>
        </FoodsProvider>
      </Router>
    );
      
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('login-submit-btn')

    userEvent.type(emailInput, 'trybe@teste.com')
    userEvent.type(passwordInput, '123456789')
    userEvent.click(submitButton)
    history.push('/foods')

    const profileButton = screen.getByTestId('button-icon')

    userEvent.click(profileButton)

    history.push('/profile')
    localStorage.setItem('user', JSON.stringify({ email: 'trybe@teste.com' }));

    const userEmail= screen.getByTestId('profile-email')
    const doneRecipesButton = screen.getByTestId('profile-done-btn')
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn')
    const logoutButton = screen.getByTestId('profile-logout-btn')

    expect(userEmail).toBeInTheDocument();
    expect(doneRecipesButton).toBeInTheDocument();
    expect(favoriteRecipesButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  })

  it('Se os botões redirecionam para as pages corretas', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Profile />
      </Router>
    );

    const doneRecipesButton = screen.getByTestId('profile-done-btn')
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn')
    const logoutButton = screen.getByTestId('profile-logout-btn')

    userEvent.click(doneRecipesButton)
    expect(history.location.pathname).toBe('/done-recipes')

    history.push('/profile')

    userEvent.click(favoriteRecipesButton)
    expect(history.location.pathname).toBe('/favorite-recipes')

    history.push('/profile')
    
    userEvent.click(logoutButton)
    expect(history.location.pathname).toBe('/')
  })
})