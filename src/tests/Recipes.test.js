import { render, screen } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";
import DrinksProvider from "../context/DrinksProvider";
import FoodsProvider from "../context/FoodsProvider";

describe('Componente Recipes', () => {
  it('Reciptes/foods', async () => {
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
    history.push('/foods');

    const card = await screen.findByText('Corba');
    expect(card).toBeInTheDocument();

    const cards = screen.getByTestId('cardsContainer');
    expect(cards.childNodes.length).toBe(12);

    userEvent.click(card);
    expect(history.location.pathname).toBe('/foods/52977');
  });
  it('Reciptes/drinks', async () => {
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
    history.push('/drinks');

    const card = await screen.findByText('GG');
    expect(card).toBeInTheDocument();

    const cards = screen.getByTestId('cardsContainer');
    expect(cards.childNodes.length).toBe(12);

    userEvent.click(card);
    expect(history.location.pathname).toBe('/drinks/15997');
  })
});