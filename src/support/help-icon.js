// @flow
import * as React from 'react';

type Props = {
  size?: number,
  title?: string,
};
const HelpIcon = ({size = 16, title = 'HelpIcon'}: Props) => {
  return (
    <svg width={size} height={size}>
      <g>
        <title>{title}</title>
        <circle
          cx="8"
          cy="8"
          id="svg_1"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <text
          fill="currentColor"
          fontSize="22"
          textAnchor="middle"
          transform="matrix(0.624082 0 0 0.624082 55.956 37.4038)"
          x="-77.24766"
          y="-38.33472"
        >
          ?
        </text>
      </g>
    </svg>
  );
};

export default HelpIcon;
