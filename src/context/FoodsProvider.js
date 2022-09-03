import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useFoods from './useFoods';
import fetchFoodApi from '../service/fetchFoodApi';
import initialFoods from '../service/initialFoods';

function FoodsProvider({ children }) {
  const history = useHistory();
  const [foods1, setfoods1] = useState({
    filter1: {
      valueIngrents: '',
      inputValue: '',
    },
  });
  const [filtroFoods, setfiltroFoods] = useState(false);
  const [categoryFood, setcategoryFood] = useState([]);
  const [resultsFood, setresultsFood] = useState('');
  const contextValue = {
    foods1,
    setfoods1,
    filtroFoods,
    setfiltroFoods,
    resultsFood,
    setresultsFood,
    categoryFood,
  };
  useEffect(() => {
    const fetchApi = async () => {
      const { valueIngrents, inputValue } = foods1.filter1;
      const request = await fetchFoodApi(valueIngrents, inputValue);
      if (request?.meals?.length === 1) {
        history.push(`/foods/${request.meals[0].idMeal}`);
      }
      if (request?.meals === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setresultsFood(request);
    };

    fetchApi();
  }, [filtroFoods]);

  useEffect(() => {
    const fetchApi = async () => {
      setresultsFood(await initialFoods());
      const category = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((data) => data.json());
      setcategoryFood(category);
    };
    fetchApi();
  }, []);

  return <useFoods.Provider value={ contextValue }>{children}</useFoods.Provider>;
}

FoodsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FoodsProvider;
