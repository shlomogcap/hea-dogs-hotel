import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui';
import NumericInput, { NumericInputProps } from '../NumericInput';
import { forwardRef } from 'react';

export type NumericFieldProps = TextFieldElementProps & NumericInputProps;

export const NumericField = forwardRef<HTMLDivElement, NumericFieldProps>(
  ({ numericFormatProps, ...props }, ref) => {
    return (
      <TextFieldElement
        ref={ref}
        {...props}
        slots={{
          input: NumericInput,
        }}
        slotProps={{
          input: {
            numericFormatProps,
            name: props.name,
            onChange: props.onChange,
          } as any,
        }}
      />
    );
  },
);

export default NumericField;
