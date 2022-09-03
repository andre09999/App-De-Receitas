const foodsForCategory = async (selectedCategory) => {
  // let category = '';
  // switch (selectedCategory) {
  // case 'Beef':
  //   category = 'Beef';
  //   break;
  // case 'Breakfast':
  //   category = 'Breakfast';
  //   break;
  // case 'Chicken':
  //   category = 'Chicken';
  //   break;
  // case 'Dessert':
  //   category = 'Dessert';
  //   break;
  // default:
  //   category = 'Goat';
  //   break;
  // }
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
  const fet2 = await fetch(url).then((data) => data.json());
  return fet2;
};

export default foodsForCategory;
