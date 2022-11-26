import { FormControl as BaseFormControl, IFormControlProps } from 'native-base';

export type FormControlProps = {
  label?: string;
} & IFormControlProps;

const FormControl = ({ label, children, ...props }: FormControlProps) => (
  <BaseFormControl {...props}>
    {label && <BaseFormControl.Label mb={1} children={label} />}
    {children}
  </BaseFormControl>
);

export default FormControl;
