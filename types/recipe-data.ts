type RecipeData = {
  id: number;
  title: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  kilocalories: number;
  process: {
    step: number;
    description: string;
  }[];
  ingridients: {
    id: string;
    value: string;
  }[];
  cookingTime: number;
  mealType: number;
  vegeterian: number;
  mass: number;
};

export default RecipeData;
