// @flow
import {type PropsT, STYLE_TYPE} from 'baseui/checkbox/index';
import {adaptToCheckbox} from '../checkbox';

export function adaptToToggle(props: any): PropsT {
  return {
    ...((adaptToCheckbox(props): any): PropsT),
    checkmarkType: STYLE_TYPE.toggle_round,
  };
}
