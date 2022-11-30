import CookBookController from './CookBookController';
import DietController from './DietController';
import RecipesController from './RecipesController';

export default {
  cookBook: new CookBookController(),
  diet: new DietController(),
  recipes: new RecipesController(),
};
