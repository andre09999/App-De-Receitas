const fetchDrinksApi = async (valueIngrents, inputValue) => {
  if (valueIngrents === 'Ingredient') {
    const fet1 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`).then((data) => data.json());
    return fet1;
  }
  if (valueIngrents === 'Name') {
    const fet2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`).then((data) => data.json());
    return fet2;
  }
  if (valueIngrents === 'First letter') {
    if (inputValue.length === 1) {
      const fet3 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`).then((data) => data.json());
      return fet3;
    }
    if (inputValue.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
  }
};

export default fetchDrinksApi;
