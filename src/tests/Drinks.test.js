import { render, screen, getByTestId, getByRole } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";
import DrinksProvider from "../context/DrinksProvider";
import FoodsProvider from "../context/FoodsProvider";

describe("Testa tela Drinks", () => {
  it("Deve renderizar a tela e seus componetes corretamente", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <FoodsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </FoodsProvider>
      </Router>
    );
    history.push("/drinks");

  
    const title = screen.getByTestId("page-title");
    const buttonIcon = screen.getByTestId("button-icon");
    const iconProfile = screen.getByTestId("profile-top-btn");
    const iconSearch = screen.getByTestId("search-top-btn");

    const buttonIconFooterDrinks = screen.getByTestId(
      "button-icon-footer-drinks"
    );
    const buttonIconFooterFoods = screen.getByTestId(
      "button-icon-footer-foods"
    );
    expect(buttonIconFooterDrinks).toBeDefined();
    expect(buttonIconFooterFoods).toBeDefined();
    userEvent.click(buttonIconFooterDrinks);

    expect(title).toBeDefined();
    expect(iconProfile).toBeDefined();
    expect(iconSearch).toBeDefined();

    const iconSearchbutton = screen.getByTestId("search-btn");
    userEvent.click(iconSearchbutton);

    const inputSearch = screen.getByTestId("search-input");
    const ingredient1 = screen.getByTestId("ingredient-search-radio");
    const ingredient2 = screen.getByTestId("name-search-radio");
    const ingredient3 = screen.getByTestId("first-letter-search-radio");
    const but = screen.getByTestId("exec-search-btn");

    expect(ingredient3).toBeDefined();
    userEvent.click(ingredient3);
    userEvent.type(inputSearch, "a");
    userEvent.click(but);

    expect(ingredient1).toBeDefined();
    userEvent.click(ingredient1);
    userEvent.type(inputSearch, "xablau do tubiru");
    userEvent.click(but);

    expect(ingredient2).toBeDefined();
    userEvent.click(ingredient2);
    userEvent.click(but);

    userEvent.click(buttonIconFooterDrinks);
    userEvent.click(iconSearchbutton);
      
    
    expect(ingredient3).toBeDefined();
    userEvent.click(ingredient3);
    userEvent.type(inputSearch, "a");
    userEvent.click(but);

    expect(inputSearch).toBeDefined();
    userEvent.type(inputSearch, "xablau do tubiru");
    expect(inputSearch).toBeDefined();

    userEvent.click(buttonIcon);
    history.push("/profile");
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/profile");
    history.push("/drinks/15997");
  });
  it("Deve renderizar a tela e seus componetes corretamente1", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <FoodsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </FoodsProvider>
      </Router>
    );
    history.push("/drinks");

  
    const title = screen.getByTestId("page-title");
    const buttonIcon = screen.getByTestId("button-icon");
    const iconProfile = screen.getByTestId("profile-top-btn");
    const iconSearch = screen.getByTestId("search-top-btn");

    const buttonIconFooterDrinks = screen.getByTestId(
      "button-icon-footer-drinks"
    );
    const buttonIconFooterFoods = screen.getByTestId(
      "button-icon-footer-foods"
    );
    expect(buttonIconFooterDrinks).toBeDefined();
    expect(buttonIconFooterFoods).toBeDefined();
    userEvent.click(buttonIconFooterFoods);
   
    expect(title).toBeDefined();
    expect(iconProfile).toBeDefined();
    expect(iconSearch).toBeDefined();

    const iconSearchbutton = screen.getByTestId("search-btn");
    userEvent.click(iconSearchbutton);

    const inputSearch = screen.getByTestId("search-input");
    const ingredient1 = screen.getByTestId("ingredient-search-radio");
    const ingredient2 = screen.getByTestId("name-search-radio");
    const ingredient3 = screen.getByTestId("first-letter-search-radio");
    const but = screen.getByTestId("exec-search-btn");

    expect(ingredient3).toBeDefined();
    userEvent.click(ingredient3);
    userEvent.type(inputSearch, "a");
    userEvent.click(but);

    expect(ingredient1).toBeDefined();
    userEvent.click(ingredient1);
    userEvent.type(inputSearch, "xablau do tubiru");
    userEvent.click(but);

    expect(ingredient2).toBeDefined();
    userEvent.click(ingredient2);
    userEvent.click(but);

    userEvent.click(buttonIconFooterDrinks);
    userEvent.click(iconSearchbutton);
      
    
    expect(ingredient3).toBeDefined();
    userEvent.click(ingredient3);
    userEvent.type(inputSearch, "a");
    userEvent.click(but);

    expect(inputSearch).toBeDefined();
    userEvent.type(inputSearch, "xablau do tubiru");
    expect(inputSearch).toBeDefined();

    userEvent.click(buttonIcon);
    history.push("/profile");
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/profile");
    history.push("/foods/52977");
  });
});

