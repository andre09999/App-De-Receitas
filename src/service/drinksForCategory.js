const drinksForCategory = async (selectedCategory) => {
  // let category = '';
  // switch (selectedCategory) {
  // case 'Ordinary Drink':
  //   category = 'Ordinary Drink';
  //   break;
  // case 'Cocktail':
  //   category = 'Cocktail';
  //   break;
  // case 'Shake':
  //   category = 'Shake';
  //   break;
  // case 'Other/Unknown':
  //   category = 'Other/Unknown';
  //   break;
  // default:
  //   category = 'Cocoa';
  //   break;
  // }
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
  const fet2 = await fetch(url).then((data) => data.json());
  return fet2;
};

export default drinksForCategory;
