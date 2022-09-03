import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useApp from '../context/useApp';
import useFoods from '../context/useFoods';

export default function SearchBar({ title }) {
  const {
    foods,
    setfoods,
    setfiltro,
    filtro,
  } = useContext(useApp);

  const {
    filtroFoods,
    setfiltroFoods,
    foods1,
    setfoods1,
  } = useContext(useFoods);
  const { filter } = foods;
  const { filter1 } = foods1;

  return (
    <div className="container-search-bar">
      <div className="search-bar">
        <label
          htmlFor="search-radio"
          onChange={ ({ target }) => {
            setfoods({
              filter: { ...filter, valueIngrents: target.value },
            });
            setfoods1({
              filter1: { ...filter1, valueIngrents: target.value },
            });
          } }
        >

          <input
            name="search-radio"
            type="radio"
            id="1"
            data-testid="ingredient-search-radio"
            value="Ingredient"
            className="button-category "
          />
          ingredient

          <input
            name="search-radio"
            type="radio"
            id="2"
            data-testid="name-search-radio"
            value="Name"
            className="button-category "
          />
          {' '}
          Name

          <input
            name="search-radio"
            type="radio"
            id="3"
            data-testid="first-letter-search-radio"
            value="First letter"
            className="button-category "
          />
          {' '}
          First letter
        </label>
      </div>
      <div>
        <input
          type="text"
          data-testid="search-input"
          className="button-category inputsearch"
          onChange={ ({ target }) => {
            setfoods({
              filter: { ...filter, inputValue: target.value },
            });
            setfoods1({
              filter1: { ...filter1, inputValue: target.value },
            });
          } }
        />

        <button
          type="button"
          className="button-category "
          data-testid="exec-search-btn"
          onClick={ () => {
            if (title === 'Foods') {
              setfiltroFoods(!filtroFoods);
            }
            if (title === 'Drinks') {
              setfiltro(!filtro);
            }
          } }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string,
}.isRequired;
