import Logo from 'con-con/components/Logo';
import {
  Box,
  Button,
  Heading,
  IBoxProps,
  IButtonProps,
  VStack,
} from 'native-base';

type Props = {
  title: string;
  withLogo?: boolean;
  buttonProps?: IButtonProps;
  subButtonProps?: IButtonProps;
} & IBoxProps;

const WizardLayout = ({
  title,
  withLogo,
  buttonProps,
  subButtonProps,
  ...props
}: Props) => (
  <Box
    px={4}
    pt="50px"
    pb="66px"
    bg="white"
    flex={1}
    justifyContent="space-between"
  >
    <Box>
      {withLogo && <Logo style={{ alignSelf: 'center' }} />}
      <Heading mt="58px" mb={5} h="2.5em" noOfLines={2} children={title} />
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
);

export default WizardLayout;
