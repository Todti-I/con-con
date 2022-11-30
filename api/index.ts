import DietController from './DietController';
import RecipesController from './RecipesController';

export default {
  diet: new DietController(),
  recipes: new RecipesController(),
};
