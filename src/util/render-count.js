// @flow
import * as React from 'react';
import {styled} from 'baseui';

const size = 30;

const Circle = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  textAlign: 'center',
  height: `${size}px`,
  width: `${size}px`,
  lineHeight: `${size}px`,
  borderRadius: `${size / 2}px`,
  border: '1px solid #ddd',
  background: '#eee',
});

export default class RenderCount extends React.Component<void> {
  renders: number = 0;

  render() {
    return <Circle>{++this.renders}</Circle>;
  }
}
