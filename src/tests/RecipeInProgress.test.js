import { render, screen } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";
import DrinksProvider from "../context/DrinksProvider";
import FoodsProvider from "../context/FoodsProvider";

describe('Componente RecipeInProgress', () => {
  it('Verifica se todos os componentes é renderizado na tela', async () => {
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
    history.push('/foods/52977/in-progress');

    const photo = screen.queryByTestId("recipe-photo");
    const title = screen.queryByTestId("recipe-title");
    const category = screen.queryByTestId("recipe-category");
    const favorite = screen.queryByTestId("favorite-btn");
    const share = screen.queryByTestId("share-btn");
    const instructions = screen.queryByTestId("instructions");
    const button = screen.queryByTestId("btn-start-recipe-area");
    expect(photo).toBeDefined();
    expect(title).toBeDefined();
    expect(category).toBeDefined();
    expect(favorite).toBeDefined();
    expect(share).toBeDefined();
    expect(instructions).toBeDefined();
    expect(button).toBeDefined();
  });

  it('Interage com os componentes da tela', async () => {
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
    history.push('/foods/52977/in-progress');

    const storage = [{
      id:"53060",
      type:"food",
      nationality:"Croatian",
      category:"Side",
      alcoholicOrNot:"",
      name:"Burek",
      image:"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
    }]

    const clipboard = 'http://localhost:3000/foods/52977'

    const favorite = await screen.findByTestId("favorite-button");
    const favoriteSrc = await screen.findByTestId("favorite-btn")
    const share = await screen.findByTestId("share-btn");
    const button = await screen.findByTestId("finish-recipe-btn");
    const textShare = screen.queryByText('Link copied!')
    const checkbox1 = screen.getByTestId('data-testid=2-ingredient-step')
    const checkbox2 = screen.getByTestId('data-testid=3-ingredient-step')
    const checkbox3 = screen.getByTestId('data-testid=4-ingredient-step')

    expect(favorite).toBeDefined();
    expect(favoriteSrc).toHaveAttribute("src","whiteHeartIcon.svg")
    userEvent.click(favorite)
    expect(favoriteSrc).toHaveAttribute("src","blackHeartIcon.svg")

    // localStorage.setItem('favoriteRecipes', JSON.stringify(storage))
    // expect(window.localStorage.setItem).toHaveBeenCalledWith();
    // // expect(localStorage.getItem).toHaveBeenCalled(mockReturn);

    history.push('/foods/52977/in-progress')

    
    expect(share).toBeDefined();
    userEvent.click(share)
    expect(textShare).toBeDefined();
    userEvent.click(share)
    // expect(window.navigator.clipboard.writeText).toBeCalledWith(clipboard)

    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);

    expect(button).toBeDefined();
    userEvent.click(button)
    history.push('/done-recipes')
    expect(history.location.pathname).toBe('/done-recipes');
  });
});