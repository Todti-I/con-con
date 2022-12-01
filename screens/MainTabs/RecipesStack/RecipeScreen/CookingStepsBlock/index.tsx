import { RecipeData } from 'con-con/types/recipes';
import { Heading, VStack } from 'native-base';
import CookingStep from './CookingStep';

type Props = {
  steps: RecipeData['process'];
};

const CookingStepsBlock = ({ steps }: Props) => (
  <VStack space={4}>
    <Heading fontSize="lg" children="Рецепт приготовления" />
    {steps.map(({ step, description }) => (
      <CookingStep key={step} stepNumber={step + 1} description={description} />
    ))}
  </VStack>
);

export default CookingStepsBlock;
