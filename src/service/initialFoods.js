const initialFoods = async () => {
  const fet = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((data) => data.json());
  return fet;
};

export default initialFoods;
