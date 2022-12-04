import CookBookController from './CookBookController';
import DietController from './DietController';
import IngredientsController from './IngredientsController';
import RecipesController from './RecipesController';

export default {
  cookBook: new CookBookController(),
  diet: new DietController(),
  ingredients: new IngredientsController(),
  recipes: new RecipesController(),
};
