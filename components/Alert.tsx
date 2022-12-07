import { AlertDialog, Button, IButtonProps } from 'native-base';
import { ReactNode, useRef } from 'react';
import { WindowProps } from './Window';

type Props = {
  heading: string;
  isLoading?: boolean;
  onSubmit?: () => void;
  submitProps?: IButtonProps;
  cancelProps?: IButtonProps;
  children?: ReactNode;
};

const Alert = ({
  isOpen,
  onClose,
  heading,
  isLoading,
  onSubmit,
  submitProps,
  cancelProps,
  children,
}: WindowProps<Props>) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const isMount = useRef(false);

  if (isOpen) {
    isMount.current = true;
  }

  if (!isMount.current) {
    return null;
  }

  return (
    <AlertDialog
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialog.Content borderRadius={20}>
        <AlertDialog.Header
          px={6}
          borderColor="transparent"
          children={heading}
          _text={{ fontSize: 'xl' }}
        />
        <AlertDialog.Body px={6} py={2} children={children} />
        <AlertDialog.Footer px={6} borderColor="transparent">
          <Button
            flex={1}
            mr={4}
            ref={cancelRef}
            variant="ghost"
            isDisabled={isLoading}
            onPress={onClose}
            children="Отмена"
            _text={{ fontWeight: 500 }}
            {...cancelProps}
          />
          <Button
            flex={1}
            variant="solid"
            colorScheme="primary"
            isLoading={isLoading}
            children="Подтвердить"
            onPress={onSubmit}
            _text={{ fontWeight: 500 }}
            {...submitProps}
          />
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Alert;
