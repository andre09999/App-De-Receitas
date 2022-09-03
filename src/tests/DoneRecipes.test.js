import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa tela Done Recipes', () => {
  it('Deve renderizar a tela e seus componetes corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    history.push('/done-recipes')
    const title = screen.getByTestId('page-title');
    const buttonIcon = screen.getByTestId('button-icon')
    const iconProfile = screen.getByTestId('profile-top-btn')
    expect(title).toBeDefined();
    expect(iconProfile).toBeDefined();;

    userEvent.click(buttonIcon);
    const { location: {pathname}  } = history;
    expect(pathname).toBe('/profile')
  })
})