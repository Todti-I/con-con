import {
  Button,
  IBoxProps,
  IButtonProps,
  IModalProps,
  Modal,
} from 'native-base';

export type WindowProps<T = Record<string, unknown>> = {
  isOpen: boolean;
  onClose: () => void;
} & T;

type Props = {
  isLoading?: boolean;
  isHideSubmit?: boolean;
  isHideCancel?: boolean;
  heading?: string;
  submitProps?: IButtonProps;
  cancelProps?: IButtonProps;
  modalProps?: Omit<IModalProps, 'children' | 'isOpen' | 'onClose'>;
} & IBoxProps;

const Window = ({
  isOpen,
  onClose,
  isLoading,
  isHideSubmit,
  isHideCancel,
  heading,
  submitProps,
  cancelProps,
  modalProps,
  children,
  ...props
}: WindowProps<Props>) => {
  return (
    <Modal
      avoidKeyboard
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      {...modalProps}
    >
      <Modal.Content borderRadius={20} {...props}>
        {heading && (
          <Modal.Header
            px={6}
            borderColor="transparent"
            children={heading}
            _text={{ fontSize: 'xl' }}
          />
        )}

        <Modal.Body
          px={6}
          pt={heading ? 1 : 6}
          pb={!isHideSubmit || !isHideCancel ? 1 : 6}
          children={children}
        />

        {(!isHideSubmit || !isHideCancel) && (
          <Modal.Footer px={6} borderColor="transparent">
            {!isHideCancel && (
              <Button
                px={3}
                variant="ghost"
                isDisabled={isLoading}
                onPress={onClose}
                children="Отмена"
                _text={{ fontWeight: 500 }}
                {...cancelProps}
              />
            )}
            {!isHideSubmit && (
              <Button
                ml={2}
                px={3}
                variant="solid"
                colorScheme="primary"
                isLoading={isLoading}
                children="Сохранить"
                _text={{ fontWeight: 500 }}
                {...submitProps}
              />
            )}
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default Window;
