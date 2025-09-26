import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

type NumericInputAdditionalProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

export type NumericInputProps = NumericInputAdditionalProps & {
  numericFormatProps?: NumericFormatProps & { onlyInteger?: boolean };
};

export const NumericInput = forwardRef<HTMLDivElement, NumericInputProps>(
  (props, ref) => {
    const { onChange, numericFormatProps = {}, ...other } = props;
    const { isAllowed, max, min, onlyInteger } = numericFormatProps;
    return (
      <NumericFormat
        thousandSeparator
        valueIsNumericString
        {...other}
        {...numericFormatProps}
        getInputRef={ref}
        isAllowed={(values) => {
          const { floatValue, value } = values;
          let isValidMax = true,
            isValidMin = true,
            isValidIntegar = true;
          if (max !== '' && max !== undefined) {
            isValidMax = (floatValue ?? 0) <= Number(max);
          }
          if (min !== '' && min !== undefined) {
            isValidMin = (floatValue ?? 0) >= Number(min);
          }
          if (onlyInteger) {
            isValidIntegar = /^\d*$/.test(value);
          }
          return (
            isValidMax &&
            isValidMin &&
            isValidIntegar &&
            (isAllowed?.(values) ?? true)
          );
        }}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
      />
    );
  },
);

export default NumericInput;
