//@flow
import type {FieldRenderProps} from '../types.js.flow';

export default function assignProps({
  meta,
  validate,
  label,
  caption,
  options,
  input,
  ...inputProps
}: FieldRenderProps) {
  return {
    formControlProps: {
      labelFor: input.name,
      caption,
      error: meta.error,
    },
    inputProps: {
      ...inputProps,
      ...input,
      id: input.name,
      error: meta.error,
    },
    meta,
    validate,
    label,
    caption,
    options,
    ...input,
  };
}
