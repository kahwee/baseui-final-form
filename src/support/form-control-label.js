// @flow
import * as React from 'react';
import HelpIcon from './help-icon';
import {StatefulTooltip} from 'baseui/tooltip';
import {StyledLabel} from 'baseui/form-control';

type Props = {
  children: React.Node,
  help?: string,
};
const FormControlLabel = ({children, help, ...rest}: Props) => {
  return (
    <StyledLabel {...rest} data-label="data-label">
      {children}
      {help && (
        <StatefulTooltip content={help}>
          <HelpIcon $position="left" {...rest} />
        </StatefulTooltip>
      )}
    </StyledLabel>
  );
};

export default FormControlLabel;
