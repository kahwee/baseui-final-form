// @flow
import * as React from 'react';
import {StatefulTooltip} from 'baseui/tooltip';
import {StyledLabel} from 'baseui/form-control';
import HelpIcon from '../support/help-icon';

type Props = {
  children?: ?React.Node,
  help?: string,
};
const FormControlLabel = ({children, help, ...rest}: Props) => {
  return (
    <StyledLabel {...rest} data-label="data-label">
      {children}
      {help && (
        <span>
          <StatefulTooltip content={help}>
            <span
              style={{
                display: 'inline-block',
                paddingLeft: '4px',
                verticalAlign: 'middle',
                overflow: 'hidden',
                height: '16px',
              }}
            >
              <HelpIcon />
            </span>
          </StatefulTooltip>
        </span>
      )}
    </StyledLabel>
  );
};

export default FormControlLabel;
