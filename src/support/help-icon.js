// @flow
import {styled} from 'baseui';

const HelpIcon = styled('span', props => {
  return {
    width: '16px',
    alignItems: 'center',
    padding:
      props.$position === 'left'
        ? '0 0 0 8px'
        : props.$position === 'right'
        ? '0 8px 0 0'
        : '0',
    ':before': {
      content: '""',
      display: 'inline-block',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: props.$isFocused ? props.$theme.colors.primary : '#999999',
    },
    ':after': {
      content: '"?"',
      color: '#999999',
      display: 'inline-block',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px',
      position: 'relative',
      left: '-11.5px',
      top: '-3.5px',
      fontSize: '12px',
    },
  };
});

export default HelpIcon;
