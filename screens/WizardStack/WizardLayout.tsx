import {
  Box,
  Button,
  Heading,
  IBoxProps,
  IButtonProps,
  KeyboardAvoidingView,
  Progress,
  VStack,
} from 'native-base';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type Props = {
  title: string;
  progressValue?: number;
  buttonProps?: IButtonProps;
  subButtonProps?: IButtonProps;
} & IBoxProps;

const WizardLayout = ({
  title,
  progressValue = 0,
  buttonProps,
  subButtonProps,
  ...props
}: Props) => {
  return (
    <KeyboardAvoidingView flex={1} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box px={4} pt="54px" pb="66px" flex={1} justifyContent="space-between">
          <Box>
            {progressValue === 0 ? (
              <Box h="20px" />
            ) : (
              <Progress h="20px" value={progressValue} max={8} />
            )}
            <Heading
              mt="58px"
              mb={5}
              h="2.5em"
              noOfLines={2}
              children={title}
            />
            <Box {...props} />
          </Box>
          <VStack mt={10} space={6}>
            <Button
              w="full"
              colorScheme="tertiary"
              _text={{
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
              {...buttonProps}
            />
            <Button w="full" variant="link" {...subButtonProps} />
          </VStack>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default WizardLayout;
