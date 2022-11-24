import {
  Collapse,
  FormControl as BaseFormControl,
  IFormControlProps,
} from 'native-base';
import { forwardRef } from 'react';

export type FormControlProps = {
  label?: string;
} & IFormControlProps;

const FormControl = ({ label, children, ...props }: FormControlProps) => (
  <BaseFormControl {...props}>
    {label && (
      <BaseFormControl.Label
        // mb={1}
        // noOfLines={1}
        // color="neutral.5"
        // lineHeight="140%"
        // fontWeight="normal"
        // fontSize="small"
        children={label}
      />
    )}
    {children}
  </BaseFormControl>
);

export default FormControl;
