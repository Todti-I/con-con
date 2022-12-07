import { IngredientData, RecipeData } from 'con-con/types/recipes';
import { Box, Heading, VStack } from 'native-base';
import { Fragment } from 'react';
import AddIngredientsToBucketButton from './AddIngredientsToBucketButton';
import IngredientRow from './IngredientRow';

type Props = {
  ingredients: IngredientData[];
};

const IngredientBlock = ({ ingredients }: Props) => (
  <VStack space={4}>
    <Heading fontSize="lg" children="Ингредиенты" />
    <Box bg="white" borderRadius={8}>
      {ingredients.map((item, i) => (
        <Fragment key={item.id}>
          {i !== 0 && <Box mx={4} h="1px" bg="text.300" />}
          <IngredientRow name={item.name || item.id} value={item.mass} />
        </Fragment>
      ))}
    </Box>
    <AddIngredientsToBucketButton ingredients={ingredients} />
  </VStack>
);

export default IngredientBlock;
