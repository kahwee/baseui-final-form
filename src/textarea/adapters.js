// @flow
import {adaptToInput} from '../input';
import type {TextareaPropsT} from 'baseui/textarea/index';

export function adaptToTextarea(props: any): TextareaPropsT {
  return ((adaptToInput(props): any): TextareaPropsT);
}
