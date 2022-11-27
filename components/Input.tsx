import { IInputProps, Input as BaseInput } from 'native-base';
import FormControl, { FormControlProps } from './FormControl';

export type InputProps = {
  label?: string;
  formControlProps?: FormControlProps;
} & IInputProps;

const Input = ({ label, onChange, formControlProps, ...props }: InputProps) => (
  <FormControl label={label} {...formControlProps}>
    <BaseInput {...props} />
  </FormControl>
);

export default Input;
