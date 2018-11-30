//@flow
import type {FieldRenderProps} from '../types.js.flow';
import FormControlLabel from '../support/form-control-label';

export default function assignProps({
  meta,
  validate,
  label,
  help,
  caption,
  options,
  input,
  ...inputProps
}: FieldRenderProps) {
  return {
    formControlProps: {
      labelFor: input.name,
      caption,
      help,
      error: meta.error,
      label,
      overrides: {
        Label: {component: FormControlLabel, props: {help}},
      },
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
