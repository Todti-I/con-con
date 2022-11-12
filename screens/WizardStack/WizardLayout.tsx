import {
  Box,
  Button,
  Heading,
  IBoxProps,
  IButtonProps,
  Progress,
} from 'native-base';

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
}: Props) => (
  <Box pt="54px" px={4} pb="66px" flex={1}>
    {progressValue === 0 ? (
      <Box h="20px" />
    ) : (
      <Progress h="20px" value={progressValue} max={2} />
    )}
    <Heading mt="58px" h="2.5em" mb={5} noOfLines={2} children={title} />
    <Box flex={1} {...props} />
    <Button
      mb={6}
      w="full"
      colorScheme="tertiary"
      _text={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase' }}
      {...buttonProps}
    />
    <Button w="full" variant="link" {...subButtonProps} />
  </Box>
);

export default WizardLayout;
