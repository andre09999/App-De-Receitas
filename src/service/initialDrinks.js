const initialDrinks = async () => {
  const fet = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((data) => data.json());
  return fet;
};

export default initialDrinks;
